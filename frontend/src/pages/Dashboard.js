import { StyledSubTitle, StyledTitle, Avatar, StyledButton, ButtonGroup } from "../componants/Styles";

import Logo from './../assets/Inptcomplaint.png';
const Home = () => {
    return (
        <div>
            <div><Avatar image={Logo}></Avatar></div>
            <StyledTitle size={65}> Bienvenue au Inpt Complaint</StyledTitle>
            <StyledSubTitle>Vous avez un probleme technique ?</StyledSubTitle>
            <ButtonGroup>
                <StyledButton to="/login">Se connecter</StyledButton>
                <StyledButton to="/signup">S'inscrire</StyledButton>
            </ButtonGroup>
        </div>
    );
};

export default Home;