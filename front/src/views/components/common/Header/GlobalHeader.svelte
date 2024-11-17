<script lang="ts">
	import { toLocalDateFormat } from '$lib/utils/timestamps';
    import Avatar from '../Avatar/Avatar.svelte';
    import ButtonIcon from '../Button/Icon/ButtonIcon.svelte';
    import ButtonRoot from '../Button/Root/ButtonRoot.svelte';
	import ButtonText from '../Button/Text/ButtonText.svelte';
	import Divider from '../Divider/Divider.svelte';
    import GridItem from '../Grid/Item/GridItem.svelte';
	import SvgIcon from '../Icon/SVG/SVGIcon.svelte';
	import Tooltip from '../Tooltip/Tooltip.svelte';
	import Typography from '../Typography/Typography.svelte';
    import './style.css';

    const currenTimestamp = toLocalDateFormat(new Date(), {
        dateStyle: 'full',
    });
    // TODO: Pegar dado da API
    const userImageUrl = 'https://avatars.worldcubeassociation.org/uploads/user/avatar/2018GUIM02/1696093574.JPG';
</script>

<header class="global-header">
    <GridItem direction='ROW' justifyContent={'space-between'} gap={4}>
        <GridItem gap={1}>
            <SvgIcon name={'faCalendarAlt'} color={'PRIMARY_DARK_1'} size={'sm'}></SvgIcon>
            <Typography type={'bodyOne'} color={'PRIMARY_DARK_1'}>{currenTimestamp}</Typography>
        </GridItem>

        <GridItem gap={1}>
            <!-- TODO: Implementar interação de atualização dos dados -->
            <Tooltip text="Atualizar dados">
                <ButtonRoot type={'BASIC'} color={'PRIMARY'}>
                    <ButtonIcon>
                        <SvgIcon name={'faArrowRotateBack'}></SvgIcon>
                    </ButtonIcon>
                </ButtonRoot>
            </Tooltip>

            {#if userImageUrl}
                <!-- TODO: Implementar interação de logout -->
                <Tooltip text="Sair da conta">
                    <ButtonRoot type={'BASIC'} color={'PRIMARY'}>
                        <ButtonIcon>
                            <SvgIcon name={'faSignOut'}></SvgIcon>
                        </ButtonIcon>
                    </ButtonRoot>
                </Tooltip>
            
                <Divider isVertical thickness={1} color={'NEUTRAL_BASE'} />

                <Avatar imageUrl={userImageUrl} marginH={2} />
            {:else}
                <Divider isVertical thickness={1} color={'NEUTRAL_BASE'} />

                <!-- TODO: Implementar interação de login e registro -->
                <ButtonRoot type={'BASIC'} color={'PRIMARY'}>
                    <ButtonText>Login</ButtonText>
                </ButtonRoot>
                
                <ButtonRoot type={'BASIC'} color={'PRIMARY'}>
                    <ButtonText>Registrar-se</ButtonText>
                </ButtonRoot>
            {/if}
        </GridItem>

        <Divider thickness={1} color={'NEUTRAL_BASE'} />
    </GridItem>

</header>