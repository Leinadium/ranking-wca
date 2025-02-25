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
    const userImageUrl = null; // 'https://avatars.worldcubeassociation.org/uploads/user/avatar/2018GUIM02/1696093574.JPG';

    function upperCaseFirstLetter(text: string) {
        return text.charAt(0).toLocaleUpperCase() + text?.slice(1)
    }
</script>

<header class="global-header">
    <GridItem direction='ROW' justifyContent={'space-between'} gap={4}>
        <GridItem gap={1}>
            <SvgIcon name={'faCalendarAlt'} color={'PRIMARY_DARK_1'} size={'sm'}></SvgIcon>
            <Typography type={'bodyOne'} color={'PRIMARY_DARK_1'}>
                {upperCaseFirstLetter(currenTimestamp || '')}
            </Typography>
        </GridItem>

        <GridItem gap={1}>
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
                <GridItem gap={3}>
                    <Typography type={'caption'} color={'NEUTRAL_DARK_1'} align={'right'}>
                        Esse é seu perfil e deseja alterar seu estado?<br />Entre com sua conta WCA
                    </Typography>
                    
                    <Divider isVertical thickness={1} color={'NEUTRAL_BASE'}  />
                </GridItem>
                
                <!-- TODO: Implementar interação de login e alteração de estado -->
                <ButtonRoot type={'BASIC'} color={'PRIMARY'}>
                    <ButtonText>Login</ButtonText>
                </ButtonRoot>
            {/if}
        </GridItem>

        <Divider thickness={1} color={'NEUTRAL_BASE'} />
    </GridItem>

</header>