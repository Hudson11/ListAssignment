import styled from 'styled-components';


export const Container = styled.div`

    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-self: center;
`;

export const Card = styled.div`

    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 1311px){
        width: 90%;
    }
`;

export const CardContent = styled.div`

    width: 100%;
    padding: 10px;
    border-radius: 8px;
    background: white;
    margin: 5px;

`;

export const CardHeader = styled.div`

    form{
        display: flex;
    }
    

`;

export const CardList = styled.div`

    width: 100%;
    background: none;
    margin: 5px 0 5px;
    #btn-delete{
        background: none;
        border: none;
    }
`;

export const CardListItem = styled.div`

    width: 100%;
    border-radius: 5px;
    border: 2px solid #ddd;
    padding: 5px;
    margin-bottom: 5px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    border-radius: 8px;

    label{
        width: 90%;
    }

    .top{
        width: 100%;
        display: flex;
        align-items: center;
    }

    .medium{
        width: 100%;
        margin-left: 5px;
    }

    #item-info{
        font-size: 12px;
        color: gray;
    }

    #div-info{
        width: 90%;
    }

    #btn-check{
        border: none;
        background: none;
        margin-right: 10px;
        cursor: pointer;

    }

`;

export const CardFooter = styled.div`

    width: 100%;
    background: white;

`;

export const ModalBody = styled.div`

    width: 500px;
    padding: 10px;
    border-radius: 8px;
    position: absolute;
    background: white;
    top: 200px;
    left: 38%;

    @media screen and (max-width: 816px){
        left: 100px;
    }

    @media screen and (max-width: 610px){
        left: 0;
        right: 0;
        width: 400px;
    }

`;

export const DivInfo = styled.div`

    width: 100%;
    display: flex;

    .div-left{
        width: 50%;
        padding: 0 10px 0;
        display: flex;
        align-items: center;

        label{
            margin: 0px 10px 0px;
            font-size: 12px;
        }
    }

    .div-right{
        width: 50%;
        display: flex;
        padding: 0 10px 0;
        justify-content: flex-end;
        align-items: center;
    }

    @media screen and (max-width: 700px){
        flex-direction: column;
        .div-left{
            width: 100%;
            justify-content: flex-start;
            flex-direction: column;
            align-items: flex-start;
            padding: 0px;
            margin-top: 5px;

        }

        .div-right{
            width: 100%;
            justify-content: center;
        }
    }

`;

export const TextArea = styled.textarea`

    font-size: 16px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid;
    width: 100%;
    height: 100px;

`;