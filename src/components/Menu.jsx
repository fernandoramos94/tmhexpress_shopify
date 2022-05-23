
import {
    Card,
    Heading,
    TextContainer,
} from "@shopify/polaris";



export function Menu() {
    function sayHellox3(){
        document.getElementById("vista1").style.display = "none";
        document.getElementById("vista2").style.display = "block";
        document.getElementById("vista3").style.display = "none";

    }
    function sayHellox4(){
        document.getElementById("vista1").style.display = "none";
        document.getElementById("vista2").style.display = "none";
        document.getElementById("vista3").style.display = "block";
    }
    function sayHellox5(){
        document.getElementById("vista1").style.display = "block";
        document.getElementById("vista2").style.display = "none";
        document.getElementById("vista3").style.display = "none";
    }

    return (
        <>
            <Card sectioned >
                <TextContainer spacing="loose">
                    <Heading element="h4">ORDENES</Heading>
                    <p onClick={sayHellox3}>🎉 Nueva Orden</p>
                    <p onClick={sayHellox4}>🎉 Ordenes Creadas</p>

                    <Heading element="h4">DATOS DEL VENDEDOR</Heading>
                    <p onClick={sayHellox5}>📚 Actualizar Datos</p>

                </TextContainer>
            </Card>
        </>
    );
}
