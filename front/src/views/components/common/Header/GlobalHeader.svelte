<script lang="ts">
	import { toLocalDateFormat } from '$lib/utils/timestamps';
	import { onMount } from 'svelte';
	import { authStore } from '../../../../stores/auth';
	import { loadLoginUrl, loadUserInformations } from '../../../../viewModels/auth';
    import Avatar from '../Avatar/Avatar.svelte';
    import ButtonIcon from '../Button/Icon/ButtonIcon.svelte';
    import ButtonRoot from '../Button/Root/ButtonRoot.svelte';
	import ButtonText from '../Button/Text/ButtonText.svelte';
	import Divider from '../Divider/Divider.svelte';
    import GridItem from '../Grid/Item/GridItem.svelte';
	import SvgIcon from '../Icon/SVG/SVGIcon.svelte';
	import Tooltip from '../Tooltip/Tooltip.svelte';
	import Typography from '../Typography/Typography.svelte';
	import { responsivenessStore } from '../../../../stores/responsiveness';
	import { DEFAULT_PERSON_AVATAR_IMAGE_SRC } from '$lib/constants/person';
	import { SvelteURLSearchParams } from 'svelte/reactivity';
	import { AUTH_CODE_PARAM_KEY, KEY_PERSISTED_USER } from '$lib/constants/auth';
	import { getPersonImage } from '$lib/utils/person';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
    import './style.css';
	import { checkIsNullOrUndefinedOrEmptyString } from '$lib/utils/validation';
	import type { UserInformationsViewModel } from '../../../../viewModels/auth/types';
	import Popover from '../Popover/Popover.svelte';
	import { TRIGGER_ID_USER_MENU, POPOVER_ID_USER_MENU } from '$lib/constants/general';

    const currenTimestamp = toLocalDateFormat(new Date(), {
        dateStyle: 'full',
    });
    const urlParams = new SvelteURLSearchParams($page.url.searchParams);
    const authCode: string | null = urlParams.get(AUTH_CODE_PARAM_KEY);
    let userImageUrl = $state(DEFAULT_PERSON_AVATAR_IMAGE_SRC);
    
    function upperCaseFirstLetter(text: string) {
        return text.charAt(0).toLocaleUpperCase() + text?.slice(1)
    }

    function removeQueryParam(paramKey: string) {
        let modifiedUrlParams = urlParams

        modifiedUrlParams.delete(paramKey)        
        goto(`${$page.url.pathname}${modifiedUrlParams.size > 0 ? '?' + modifiedUrlParams.toString() : ''}`, { replaceState: true });
    };

    function getPersistedUserData() {
        const persistedData = sessionStorage.getItem(KEY_PERSISTED_USER) || null
        return checkIsNullOrUndefinedOrEmptyString(persistedData) ? null : JSON.parse(persistedData)
    }

    function updatePersistedUserData(newData: UserInformationsViewModel | null) {
        if (!newData) {
            sessionStorage.removeItem(KEY_PERSISTED_USER)
        } else {
            sessionStorage.setItem(KEY_PERSISTED_USER, JSON.stringify(newData))
        }

        authStore.update((state) => ({
            ...state,
            user: newData,
        }));
    }

    async function updateUserData(code: string | null) {
        if (!code) return

        // TODO: Remover valor alternativo de mock após implementações locais do /register
        // const userInformations = (await loadUserInformations({ code }))
        const userInformations: UserInformationsViewModel = {
            accessToken:"x",
            expirationTime: 7199,
            name:"Daniel Schreiber Guimarães",
            wcaId: "2018GUIM02",
            customRegistration: {
                canRegister:true,
                stateId: null,
                updateTimestamp: null,
            },
        }

        updatePersistedUserData(userInformations)
    }

    async function initializeUserData() {
        const persistedUser = getPersistedUserData()

        if (persistedUser) {
            updatePersistedUserData(persistedUser)
            removeQueryParam(AUTH_CODE_PARAM_KEY)
            return
        }

        await loadLoginUrl()
        await updateUserData(authCode)
        removeQueryParam(AUTH_CODE_PARAM_KEY)
    }

    function handleLogout() {
        removeQueryParam(AUTH_CODE_PARAM_KEY)
        updatePersistedUserData(null)
    }

    $effect(() => {
        if (!$authStore.user) return

        (async() => {
            const userImage = await getPersonImage({ wcaId: $authStore.user.wcaId })
            userImageUrl = userImage || DEFAULT_PERSON_AVATAR_IMAGE_SRC
        })()
    })

    onMount(() => {
        initializeUserData()
	});
</script>

<header class="global-header">
    {#key $responsivenessStore.isSmallDevice}
        <GridItem direction='ROW' justifyContent={$responsivenessStore.isSmallDevice ? 'flex-end' : 'space-between'} gap={4}>
            {#if !$responsivenessStore.isSmallDevice}
                <GridItem gap={1}>
                    <SvgIcon name={'faCalendarAlt'} color={'PRIMARY_DARK_1'} size={'sm'}></SvgIcon>
                    <Typography type={'bodyOne'} color={'PRIMARY_DARK_1'}>
                        {upperCaseFirstLetter(currenTimestamp || '')}
                    </Typography>
                </GridItem>
            {/if}

            <GridItem gap={1}>
                {#if $authStore.user}
                    <Tooltip text="Sair da conta">
                        <ButtonRoot type={'BASIC'} color={'PRIMARY'} onClickFn={handleLogout}>
                            <ButtonIcon>
                                <SvgIcon name={'faSignOut'}></SvgIcon>
                            </ButtonIcon>
                        </ButtonRoot>
                    </Tooltip>
                
                    <Divider isVertical thickness={1} color={'NEUTRAL_BASE'} />

                    <ButtonRoot
                        type={'BASIC'}
                        color={'NEUTRAL'}
                        popovertarget={POPOVER_ID_USER_MENU}
                        classes={TRIGGER_ID_USER_MENU}
                    >
                        <Avatar imageUrl={userImageUrl} marginH={2} />
                    </ButtonRoot>

                    <Popover id={POPOVER_ID_USER_MENU} />
                {:else}
                    {#if !$responsivenessStore.isSmallDevice}
                        <GridItem gap={3}>
                            <Typography type={'caption'} color={'NEUTRAL_DARK_1'} align={'right'}>
                                Esse é seu perfil e deseja alterar seu estado?<br />Entre com sua conta WCA
                            </Typography>
                            
                            <Divider isVertical thickness={1} color={'NEUTRAL_BASE'}  />
                        </GridItem>
                    {/if}
                    
                    <ButtonRoot type={'BASIC'} color={'PRIMARY'} href={$authStore.loginUrl || '#'}>
                        <ButtonText>Login</ButtonText>
                    </ButtonRoot>
                {/if}
            </GridItem>

            <Divider thickness={1} color={'NEUTRAL_BASE'} />
        </GridItem>
    {/key}
</header>