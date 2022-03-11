import styled from "styled-components";


export const HeaderContainer = styled.div`
  height: 70px ;
  background-color: #2280FF ;
  display: flex ;
  align-items: center ;
  padding:  0 9rem;

  .content{
    flex: 1;
    min-width: 85%; 
    height: 100% ;
    display: flex ;
    align-items: center ;
    justify-content: space-between ;
  }

  img{
    height: 80px ;
  }

  a{
    font-size: 20px; 
    color: #FFF;
    text-decoration: none ;
  }

  &:hover a{
    cursor: pointer ;
   
  }
  
`

export const NavigationHeader = styled.nav`
  display: flex;
  flex: 1;
  padding: 0 3rem;
  align-items: center;
  justify-content: space-around;

  span{
    font-size: 20px; 
    color: #FFF;
  }

  &:hover span{
    cursor: pointer ;
  }

`