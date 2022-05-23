import {
  Card,
  FormLayout,
  Form,
  Page,
  Layout,
  TextContainer,
  Image,
  Stack,
  Link,
  Heading,
  EmptyState,
  Button,
  DisplayText,
  TextStyle,
  DataTable,
  TextField,
  Loading, Banner,
} from "@shopify/polaris";
import logoImg from "../assets/logo.png";
import { Menu } from  "./Menu.jsx"
import React from "react";
import axios from 'axios';




export function HomePage() {


  /*LISTA ORDENES NUEVAS*/
  async function sayHello() {

    let address = document.getElementsByClassName("Polaris-TextField__Input")[4].value;
    console.log(address)
    let response = await fetch("https://maps.googleapis.com/maps/api/geocode/json?address="+address+'&key=AIzaSyBhl0Ca6zj1SSV8s38cfxIRKdZmFMzIROc');
    let data = await response.json();
    console.log("Obteniendo datos direccion 1");
    console.log(data);
    console.log(data["results"][0]["formatted_address"]);
    console.log(data["results"][0]["geometry"]["location"]["lat"]);
    console.log(data["results"][0]["geometry"]["location"]["lng"]);

    let address2 = document.getElementById("form2").innerText;
    console.log(address)
    let response2 = await fetch("https://maps.googleapis.com/maps/api/geocode/json?address="+address2+'&key=AIzaSyBhl0Ca6zj1SSV8s38cfxIRKdZmFMzIROc');
    let data2 = await response2.json();
    console.log("Obteniendo datos direccion 1");
    console.log(data2);
    console.log(data2["results"][0]["formatted_address"]);
    console.log(data2["results"][0]["geometry"]["location"]["lat"]);
    console.log(data2["results"][0]["geometry"]["location"]["lng"]);

    var body = {
      "origin": {
        "address": data["results"][0]["formatted_address"],
        "latitude": data["results"][0]["geometry"]["location"]["lat"],
        "longitude": data["results"][0]["geometry"]["location"]["lng"]
      },
      "destination":{
        "address": data2["results"][0]["formatted_address"],
        "latitude": data2["results"][0]["geometry"]["location"]["lat"],
        "longitude": data2["results"][0]["geometry"]["location"]["lng"]
      },
      "contact": {
        "number_identification": document.getElementById("form2").innerText,
        "full_name": document.getElementsByClassName("Polaris-TextField__Input")[0].value,
        "phone": document.getElementsByClassName("Polaris-TextField__Input")[3].value,
        "email": document.getElementsByClassName("Polaris-TextField__Input")[2].value
      },
      "package": {
        "dimensions": {
          "volume": "0",
          "pieces": "0",
          "weight": "0"
        },
        "containt": "Paquete Shopify App",
        "type_product": document.getElementById("form3").innerText,
      }
    }
    const config = {
      'headers':{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer iZjL8MujTP8nb1MbfYeCKm2OOBxgyEXY'
      }
    };

    let responsex = axios.post('https://tmhexpress.uc.r.appspot.com/api/createOrder',body,config);
    let datax = await responsex;
    console.log("Orden creada con exito");
    console.log(datax['data']['order_id']);
    alert("ORDEN ID: " + datax['data']['order_id']);
    location.reload();
  }
  const rows = [
    [
      <input type="checkbox" id="form1" name="form1" value="Bike"></input>,
      <p id="form1" name="form1">1</p>,
      <p id="form2" name="form2">Ciudad de Mexico, Reforma 222</p>,

      <select name="form3" id="form3">
        <option value="sameday">Sameday</option>
        <option value="next_day">Next Day</option>
      </select>,
      <p name="form4" id="form4">Enviado</p>
    ]
  ];


  /*LISTA ORDENES CREADAS*/
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function sayHello2(){
    for (var i = 1; i < document.getElementsByClassName("Polaris-DataTable__TableRow Polaris-DataTable--hoverable").length; i++) {
      console.log("ID: " + i);
      try{
        if (document.getElementById('fomrx_'+i+'_4').checked) {

          console.log("Seleccionada :)" + i)
          var link = document.createElement('a');
          link.href = "https://tmhexpress.uc.r.appspot.com/print_guide/" + document.getElementById("formx_"+i+"_1").textContent;
          link.download = 'file.pdf';
          link.dispatchEvent(new MouseEvent('click'));
          await sleep(1000);
        } else {
          console.log("No Seleccionada")
        }

      }catch (error){
        console.log("error")
      }

    }




  }
  const [post, setPost] = React.useState(null);
  React.useEffect(() => {
    axios.get('https://tmhexpress.uc.r.appspot.com/api/orders', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer iZjL8MujTP8nb1MbfYeCKm2OOBxgyEXY'
          }
        }
    ).then((response) => {
      setPost(response.data);
    });
  }, []);
  if (!post) return null;
  const rows2 = [];
  console.log("ORDENES API");
  console.log(post)
  let contador = 1;
  post.forEach(element =>{
      rows2.push([

        <p id={"formx_" + contador+"_1"} name={"formx_" + contador+"_1"}>{element['id']}</p>,
        <p style={{"whiteSpace": "pre-wrap"}} id={"formx_" + contador+"_2"} name={"formx_" + contador+"_2"}>{element['destination_address']}</p>,
        <p id={"formx_" + contador+"_3"} name={"formx_" + contador+"_3"}>{element['guide']}</p>,
        <input type="checkbox" id={"fomrx_" + contador+"_4"} name={"fomrx_" + contador+"_4"} value="Bike"></input>

      ]);
      contador = contador + 1;
  }

  );

  /*DATOS DEL VENDEDOR*/
  function sayHello3(){
    document.getElementById("vista1").style.display = "none";
    document.getElementById("vista2").style.display = "block";
    document.getElementById("vista3").style.display = "none";

  }


  return (
    <Page fullWidth>

      <Layout>
        <Layout.Section secondary>
          <Menu/>
        </Layout.Section>
        <Layout.Section>
          <div id="vista1">

            <Stack
                wrap={false}
                spacing="extraTight"
                distribution="trailing"
                alignment="top"
            >
              <Stack.Item fill>
                <Heading style={{"padding-top": "3rem"}}>Informacion del vendedor 🎉</Heading>


              </Stack.Item>


              <Stack.Item>
                <div style={{ padding: "0 20px" }}>
                  <Image
                      source={logoImg}
                      alt="Nice work on building a Shopify app"
                      width={100}
                  />
                </div>
              </Stack.Item>

            </Stack>

            <Card sectioned>
              <Stack
                  wrap={false}
                  spacing="extraTight"
                  distribution="trailing"
                  alignment="center"
              >
                <Stack.Item fill>
                  <TextContainer spacing="loose">
                    <Form onSubmit={sayHello3}>


                      <FormLayout>
                        <TextField
                            value={"Fulanito Perez"}
                            label="Nombre Completo:"
                            type="text"
                        />

                        <TextField
                            value={"iZjL8MujTP8nb1MbfYeCKm2OOBxgyEXY"}
                            label="API KEY:"
                            type="text"
                        />

                        <TextField
                            label="Correo electronico:"
                            value={"contacto@gmail.com"}
                            type="email"
                        />
                        <TextField
                            label="Numero de telefono:"
                            value={"5545454545"}
                            type="phone"
                        />
                        AIzaSyAJI6R4DUNCfwvQYZJZGltf9qztLnQMzKY
                        <TextField
                            label="Direccion de recoleccion:"
                            value={"insurgentes 1000 Ciudad de Mexico"}
                            type="text"
                        />
                        <TextField
                            label="Codigo Postal:"
                            value={"04200"}
                            type="number"
                        />



                        <Button submit >Guardar Datos</Button>
                      </FormLayout>
                    </Form>


                  </TextContainer>
                </Stack.Item>

              </Stack>
            </Card>
          </div>
          <div style={{display: "none"}} id="vista2">

            <Stack
                wrap={false}
                spacing="extraTight"
                distribution="trailing"
                alignment="top"
            >
              <Stack.Item fill>
                  <Heading style={{"padding-top": "3rem"}}>Nueva Orden 🎉</Heading>
                  <p>
                   Crea un nuevo envio
                  </p>

              </Stack.Item>


              <Stack.Item>
                <div style={{ padding: "0 20px" }}>
                  <Image
                      source={logoImg}
                      alt="Nice work on building a Shopify app"
                      width={100}
                  />
                </div>
              </Stack.Item>

            </Stack>

            <Card sectioned>
              <Stack
                wrap={false}
                spacing="extraTight"
                distribution="trailing"
                alignment="center"
              >
                <Stack.Item fill>
                  <TextContainer spacing="loose">

                    <div style={{display: "inline-flex"}}>
                      <div>
                        <Heading>Envia multiples pedidos 🎉!</Heading>
                      </div>
                      <div>

                        <Button  primary
                                 onClick={sayHello}
                        >Enviar Seleccionadas</Button>
                      </div>
                    </div>

                    <DataTable
                        columnContentTypes={[
                          'html',
                          'numeric',
                          'text',
                          'html',
                          'text',
                        ]}
                        headings={[
                          'Todos',
                          '# Orden',
                          'Destino',
                          'Tipo de Envio',
                          'Estatus',
                        ]}
                        rows={rows}
                    />

                  </TextContainer>
                </Stack.Item>

              </Stack>
            </Card>

          </div>



          <div style={{display: "none"}} id="vista3">
            <Stack
                wrap={false}
                spacing="extraTight"
                distribution="trailing"
                alignment="top"
            >
              <Stack.Item fill>
                <Heading style={{"padding-top": "3rem"}}>Ordenes Creadas sastifactoriamente 🎉</Heading>
                <p>
                  Consulta los numeros de rastero de las ordenes creadas sastifactoriamente
                </p>

              </Stack.Item>


              <Stack.Item>
                <div style={{ padding: "0 20px" }}>
                  <Image
                      source={logoImg}
                      alt="Nice work on building a Shopify app"
                      width={100}
                  />
                </div>
              </Stack.Item>

            </Stack>

            <Card sectioned>
              <Stack
                  wrap={false}
                  spacing="extraTight"
                  distribution="trailing"
                  alignment="center"
              >
                <Stack.Item fill>
                  <TextContainer spacing="loose">

                    <div style={{display: "inline-flex"}}>
                      <div>
                        <Heading>Ordenes Creadas 🎉!</Heading>
                      </div>
                      <div>

                        <Button  primary
                                 onClick={sayHello2}
                        >Imprimir</Button>
                      </div>
                    </div>

                    <DataTable
                        columnContentTypes={[
                          'html',
                          'html',
                          'html',
                          'html',
                          'html',
                        ]}
                        headings={[
                          '# Orden',
                          '# ID Guia',
                          'Guia',
                          'Seleccionar',
                        ]}
                        rows={rows2}
                    />

                  </TextContainer>
                </Stack.Item>

              </Stack>
            </Card>
          </div>





        </Layout.Section>

      </Layout>
    </Page>
  );
}


function randomTitle() {
  const adjective = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];

  return `${adjective} ${noun}`;
}

const ADJECTIVES = [
  "autumn",
  "hidden",
  "bitter",
  "misty",
  "silent",
  "empty",
  "dry",
  "dark",
  "summer",
  "icy",
  "delicate",
  "quiet",
  "white",
  "cool",
  "spring",
  "winter",
  "patient",
  "twilight",
  "dawn",
  "crimson",
  "wispy",
  "weathered",
  "blue",
  "billowing",
  "broken",
  "cold",
  "damp",
  "falling",
  "frosty",
  "green",
  "long",
  "late",
  "lingering",
  "bold",
  "little",
  "morning",
  "muddy",
  "old",
  "red",
  "rough",
  "still",
  "small",
  "sparkling",
  "throbbing",
  "shy",
  "wandering",
  "withered",
  "wild",
  "black",
  "young",
  "holy",
  "solitary",
  "fragrant",
  "aged",
  "snowy",
  "proud",
  "floral",
  "restless",
  "divine",
  "polished",
  "ancient",
  "purple",
  "lively",
  "nameless",
];

const NOUNS = [
  "waterfall",
  "river",
  "breeze",
  "moon",
  "rain",
  "wind",
  "sea",
  "morning",
  "snow",
  "lake",
  "sunset",
  "pine",
  "shadow",
  "leaf",
  "dawn",
  "glitter",
  "forest",
  "hill",
  "cloud",
  "meadow",
  "sun",
  "glade",
  "bird",
  "brook",
  "butterfly",
  "bush",
  "dew",
  "dust",
  "field",
  "fire",
  "flower",
  "firefly",
  "feather",
  "grass",
  "haze",
  "mountain",
  "night",
  "pond",
  "darkness",
  "snowflake",
  "silence",
  "sound",
  "sky",
  "shape",
  "surf",
  "thunder",
  "violet",
  "water",
  "wildflower",
  "wave",
  "water",
  "resonance",
  "sun",
  "wood",
  "dream",
  "cherry",
  "tree",
  "fog",
  "frost",
  "voice",
  "paper",
  "frog",
  "smoke",
  "star",
];
