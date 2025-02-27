<script lang="ts">
	import { toLocalDateFormat } from '$lib/utils/timestamps';
	import { onMount } from 'svelte';
	import { authStore } from '../../../../stores/auth';
	import { loadLoginUrl } from '../../../../viewModels/auth';
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
	import { page } from '$app/stores';
	import { KEY_PERSISTED_USER } from '$lib/constants/auth';
	import { getPersonImage } from '$lib/utils/person';
    import './style.css';

    const currenTimestamp = toLocalDateFormat(new Date(), {
        dateStyle: 'full',
    });
    const urlParams = new SvelteURLSearchParams($page.url.searchParams);
    const authCode: string | null = urlParams.get("code");
    let userImageUrl = $state(DEFAULT_PERSON_AVATAR_IMAGE_SRC);
    
    function upperCaseFirstLetter(text: string) {
        return text.charAt(0).toLocaleUpperCase() + text?.slice(1)
    }

    function getPersistedUserData() {
        return JSON.parse(sessionStorage.getItem(KEY_PERSISTED_USER) || 'null')
    }

    function updateUserData(code: string | null) {
        if (!code) return

        // TODO: Fazer requisição para auth/callback
        const mockedResponseData = {
            accessToken:"x",
            expiresIn: 7199,
            name:"Daniel Schreiber Guimarães",
            register: {
                canRegister:true,
                stateId: null,
                updated: null,
            },
            wcaId: "2018GUIM02",
        }

        authStore.update((state) => ({
            ...state,
            user: mockedResponseData,
        }));
    }

    function handleLogout() {
        authStore.update((state) => ({
            ...state,
            user: null,
        }));
    }

    $effect(() => {
        if (!$authStore.user) return

        (async() => {
            const userImage = await getPersonImage({ wcaId: $authStore.user.wcaId })
            userImageUrl = userImage || DEFAULT_PERSON_AVATAR_IMAGE_SRC
        })()
    })

    $effect(() => {
        if (!$authStore.user) return sessionStorage.removeItem(KEY_PERSISTED_USER)
        sessionStorage.setItem(KEY_PERSISTED_USER, JSON.stringify($authStore.user))
    })

    onMount(() => {
        const persistedUser = getPersistedUserData()

        if (persistedUser) {
            authStore.update((state) => ({
                ...state,
                user: persistedUser,
            }));
            return
        }

        (async() => {
            await loadLoginUrl()
            await updateUserData(authCode)
        })()
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

                    <Avatar imageUrl={userImageUrl} marginH={2} />
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