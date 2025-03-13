<script lang="ts">
	import { toLocalDateFormat } from '$lib/utils/timestamps';
	import { onMount } from 'svelte';
	import { authStore } from '../../../../stores/auth';
	import {
		loadLoginUrl,
		loadUserInformations,
		updateUserInformations
	} from '../../../../viewModels/auth';
	import Avatar from '../Avatar/Avatar.svelte';
	import ButtonIcon from '../Button/Icon/ButtonIcon.svelte';
	import ButtonRoot from '../Button/Root/ButtonRoot.svelte';
	import ButtonText from '../Button/Text/ButtonText.svelte';
	import Divider from '../Divider/Divider.svelte';
	import GridItem from '../Grid/Item/GridItem.svelte';
	import SvgIcon from '../Icon/SVG/SVGIcon.svelte';
	import Typography from '../Typography/Typography.svelte';
	import { responsivenessStore } from '../../../../stores/responsiveness';
	import { DEFAULT_PERSON_AVATAR_IMAGE_SRC } from '$lib/constants/person';
	import { SvelteURLSearchParams } from 'svelte/reactivity';
	import { AUTH_CODE_PARAM_KEY, KEY_PERSISTED_USER } from '$lib/constants/auth';
	import { getPersonImage } from '$lib/utils/person';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { checkIsNullOrUndefined, checkIsNullOrUndefinedOrEmptyString } from '$lib/utils/validation';
	import type { UserInformationsViewModel } from '../../../../viewModels/auth/types';
	import Popover from '../Popover/Popover.svelte';
	import { TRIGGER_ID_USER_MENU, POPOVER_ID_USER_MENU } from '$lib/constants/general';
	import Modal from '../Modal/Modal.svelte';
	import InputGroupRoot from '../InputGroup/Root/InputGroupRoot.svelte';
	import InputGroupLabel from '../InputGroup/Label/InputGroupLabel.svelte';
	import Select from '../Select/Select.svelte';
	import { openModal } from '$lib/utils/modal';
	import './style.css';
	import { STATE_SELECT_OPTIONS } from '$lib/constants/location';
	import { showErrorMessage } from '$lib/utils/feedback';

	const currenTimestamp = toLocalDateFormat(new Date(), {
		dateStyle: 'full'
	});
	const urlParams = new SvelteURLSearchParams(page.url.searchParams);
	const authCode: string | null = urlParams.get(AUTH_CODE_PARAM_KEY);

	const USER_MENU_OPTIONS = [
		{
			label: 'Ver perfil',
			iconName: 'faUser',
			fn: redirectToUserPage
		},
		{
			label: 'Alterar dados pessoais',
			iconName: 'faIdCard',
			fn: openChangeUserInformationsModal
		},
		{
			label: 'Sair da conta',
			iconName: 'faSignOut',
			fn: handleLogout
		}
	];

	let selectedUserState: string | null = $state(null);
	let userImageUrl = $state(DEFAULT_PERSON_AVATAR_IMAGE_SRC);

	function upperCaseFirstLetter(text: string) {
		return text.charAt(0).toLocaleUpperCase() + text?.slice(1);
	}

	function removeQueryParam(paramKey: string) {
		let modifiedUrlParams = urlParams;

		modifiedUrlParams.delete(paramKey);
		goto(
			`${page.url.pathname}${modifiedUrlParams.size > 0 ? '?' + modifiedUrlParams.toString() : ''}`,
			{ replaceState: true }
		);
	}

	function getPersistedUserData() {
		const persistedData = sessionStorage.getItem(KEY_PERSISTED_USER) || null;
		return checkIsNullOrUndefinedOrEmptyString(persistedData)
			? null
			: JSON.parse(persistedData || '');
	}

	function updatePersistedUserData(newData: UserInformationsViewModel | null) {
		if (!newData) {
			sessionStorage.removeItem(KEY_PERSISTED_USER);
		} else {
			sessionStorage.setItem(KEY_PERSISTED_USER, JSON.stringify(newData));
		}

		authStore.update((state) => ({
			...state,
			user: newData
		}));
	}

	async function getUpdatedUserData(code: string | null) {
		if (!code) return;

		const userInformations = await loadUserInformations({ code });
		updatePersistedUserData(userInformations);
	}

	async function initializeUserData() {
		const persistedUser = getPersistedUserData();

		if (persistedUser) {
			updatePersistedUserData(persistedUser);
			removeQueryParam(AUTH_CODE_PARAM_KEY);
			return;
		}

		await loadLoginUrl();
		await getUpdatedUserData(authCode);
		removeQueryParam(AUTH_CODE_PARAM_KEY);
	}

	function handleLogout() {
		removeQueryParam(AUTH_CODE_PARAM_KEY);
		updatePersistedUserData(null);
	}

	function openChangeUserInformationsModal() {
		selectedUserState = $authStore.user?.customRegistration?.stateId;
		openModal();
	}

	// TODO: Melhorar tipagem de estado
	function updateModalSelectedUserState(stateId: string) {
		selectedUserState = stateId;
	}

	async function handleConfirmUserInformationsChange() {
		await updateUserInformations({
			accessToken: $authStore.user.accessToken,
			wcaId: $authStore.user.wcaId,
			stateId: selectedUserState,
			customOnSuccessFn: async () => await getUpdatedUserData(authCode)
		});
	}

	function redirectToUserPage() {
		const userWcaId = $authStore.user?.wcaId

		if (checkIsNullOrUndefined(userWcaId)) {
			showErrorMessage({
				technicalMessage: 'Informado wcaId inválido para redirecionamento de página.',
				friendlyMessage: 'Não foi possível redirecionar para página do usuário.'
			})
			return
		}

		const baseUrl = page?.url?.origin  
		goto(`${baseUrl}/person/${userWcaId}`)
	}

	function checkIsPersonPage(): boolean {
		return page?.url?.pathname?.includes('/person/') || false
	}

	$effect(() => {
		if (!$authStore.user) return;

		(async () => {
			const userImage = await getPersonImage({ wcaId: $authStore.user.wcaId });
			userImageUrl = userImage || DEFAULT_PERSON_AVATAR_IMAGE_SRC;
		})();
	});

	onMount(() => {
		initializeUserData();
	});
</script>

<header class="global-header">
	{#key $responsivenessStore.isSmallDevice}
		<GridItem
			direction="ROW"
			justifyContent={$responsivenessStore.isSmallDevice ? 'flex-end' : 'space-between'}
			gap={4}
		>
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
					<ButtonRoot
						type={'BASIC'}
						color={'NEUTRAL'}
						popovertarget={POPOVER_ID_USER_MENU}
						classes={TRIGGER_ID_USER_MENU}
					>
						<Avatar imageUrl={userImageUrl} marginH={2} />

						<SvgIcon name={'faChevronDown'} color={'NEUTRAL_DARK_1'} size={'2xs'} />
					</ButtonRoot>

					<Popover id={POPOVER_ID_USER_MENU}>
						{#each USER_MENU_OPTIONS as option}
							<GridItem gap={0} wrap={'NOWRAP'}>
								<ButtonRoot type={'BASIC'} size={'SMALL'} color={'NEUTRAL'} onClickFn={option.fn}>
									<ButtonIcon>
										<SvgIcon name={option.iconName}></SvgIcon>
									</ButtonIcon>

									<ButtonText color={'NEUTRAL_DARK_1'}>
										{option.label}
									</ButtonText>
								</ButtonRoot>
							</GridItem>
						{/each}
					</Popover>

					<Modal
						size={'SMALL'}
						title="Alteração de dados pessoais"
						actionText={'Alterar'}
						actionFn={async () => handleConfirmUserInformationsChange()}
						isActionDisabled={!selectedUserState ||
							selectedUserState === $authStore.user?.customRegistration?.stateId}
					>
						<InputGroupRoot isFullWidth>
							<InputGroupLabel text={'Estado'} />
							<Select
								options={STATE_SELECT_OPTIONS}
								value={selectedUserState}
								onChangeFn={(event) => updateModalSelectedUserState(event?.target?.value)}
								isFullWidth
							/>
						</InputGroupRoot>
					</Modal>
				{:else}
					{#if checkIsPersonPage() && !$responsivenessStore.isSmallDevice}
						<GridItem gap={3}>
							<Typography type={'caption'} color={'NEUTRAL_DARK_1'} align={'right'}>
								Esse é seu perfil e deseja alterar seu estado?<br />Entre com sua conta WCA
							</Typography>

							<Divider isVertical thickness={1} color={'NEUTRAL_BASE'} />
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
