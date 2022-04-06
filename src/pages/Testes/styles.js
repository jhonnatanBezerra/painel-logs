import styled from 'styled-components'


export const WrapperAside = styled.aside`
  height: 100vh;
  background:  #FFF;
  min-width: 16%;
  width: 16%;
  border-right: 1px solid #e1e1e1;
  padding: 2rem 1rem 1rem;
  display: flex;
  flex-direction: column;

`

export const HeaderAsideWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 30px;
  border-bottom: 1px solid #e1e1e1;


  img{
    width: 50%;
    border-radius: 10%;
    object-fit: contain;
  }

`;

export const MainAsideWrapper = styled.div`

  flex: 1;
  margin-top: 20px;
  overflow-y: auto;
  border-bottom: 1px solid #e1e1e1;

  
`;

export const DirectLinksWrapper = styled.div`

  border-bottom: 1px solid #e1e1e1;

  div{
      display: flex;
      align-items: center;
      margin-bottom: 2rem;
      cursor: pointer;
    
      p,svg{
        color: #333;
        font-weight: 600;
      }

      p{
        padding-left: 0.5rem;
      }

      svg{
        font-size: 1rem;

      }
    }

`;




export const FooterAsideWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;

  div span{
    font-weight: bold;
    text-align: center;
  }

  div p{
    font-size: 0.8rem;
  }

  svg{
    font-size: 1.5rem;
    margin-left: .5rem;
    cursor: pointer;
  }

`;


/*************************MENU COMPONENT******************************/

export const MenuWrapper = styled.div`
  border-bottom: 1px solid #e1e1e1;
`;

export const TitleMenu = styled.div`

    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0;
    cursor: pointer;

   strong, svg{
    font-weight: 600;
    color: #333;
    
  }

   svg{
    font-size: 1.5rem;
    transform: rotate(${props => props.isOpen}deg);
    transition: all 0.2s ease-in-out;
  }

`;

export const ListMenu = styled.ul`
  padding: 0.5rem 0;
  list-style: none;
  display: ${props => props.isOpen ? 'block' : 'none'};
  opacity: ${props => props.isOpen ? 1 : 0};
  transition: all 0.2s ease-in-out;
  

`

export const ListItem = styled.li`
  
    margin-bottom: 0.625rem;
    display: flex;
    align-items: center;
    

    svg{
      margin-right: 0.5rem;
    }
`;