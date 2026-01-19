const button = document.querySelector('.button-primary');
const mealName = document.querySelector('.container .nome');
const mealDescription = document.querySelector('.container .description');
const mealDetail = document.querySelector('.container .detail');
const mealIngredients = document.querySelector('.container .ingredients');
const mealVideo = document.querySelector('.container .video');

const dispoElementos = document.querySelector(".wrapper");
const header = document.querySelector(".header");
const container = document.querySelector(".container");

container.style.opacity = 0; // Inicialmente, o container está invisível

let image = '';

button.addEventListener('click', () => {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php') //Buscando uma refeição aleatória na API
        .then(response => response.json()) //Convertendo a resposta em JSON
        .then(response => {
            getMeal(response.meals[0]); // Passando o resultado para a função getMeal
            // console.log(response);
        });
});

const getMeal = result => { // Função para exibir os detalhes da refeição

    const ingredientList = [];
    let textoOriginal;

    function quebraLinha(texto) {
        textoOriginal = result[texto];
        while (textoOriginal.includes('\r\n')) { // Verifica
            textoOriginal = textoOriginal.replace("\r\n", '<br>'); // Substitui por <br>
            /*if (textoOriginal.includes('▢')) {
                textoOriginal = textoOriginal.replace("▢", '');
            }*/
        }
        return textoOriginal;
    }

    let descrição = quebraLinha(`strInstructions`);
    console.log(descrição);

    

    image = `
        <img src=${result[`strMealThumb`]} alt="image error" />
    `;

    const nome = () => {
        return `
            <h2 class="alimento">${result[`strMeal`]}</h2>
            <div class="detalhes">
                <p><strong>Category:</strong> ${result[`strCategory`]}</p>
                <p><strong>Area:</strong> ${result[`strArea`]}</p>
            </div>
            <h2 class="recipe">How to do</h2> `
        };
    
    const description = () => {
        return `
        <p>${descrição}</p>
       `;
    };

    const ingredients = () => {
        for (let i = 1; i <= 20; i++) {
            if (result[`strIngredient${i}`]) {
                ingredientList.push(`<li>${result[`strIngredient${i}`]} : ${result[`strMeasure${i}`]}</li>`);
            } else {
                const text = ingredientList.join("")
                return `
                    <h2>Ingredientes</h2>
                    ${text}
                `;
            };
        };
    };

    const video = () => {
        return `
            <iframe class="youtube" src="https://www.youtube.com/embed/${result.strYoutube.slice(-11)}">
            </iframe>
        `;
    };

    mealName.innerHTML = nome();
    mealDescription.innerHTML = description();
    mealDetail.innerHTML = image;
    mealVideo.innerHTML = video();
    mealIngredients.innerHTML = ingredients();



    /*header.style.width = "20%";
    header.style.position = "fixed";
    header.style.alignSelf = "left";
    header.style.top = "50%";
    header.style.transform = "translateY(-60%)";
    header.style.left = "0px";
    header.style.textAlign = "start";
    header.style.padding = "6vh";*/
    
    header.classList.add("header-animation");

    container.style.opacity = 1; // Tornar o container visível com transição suave
    container.style.transform = "translateY(0px)";
    
    container.style.display = "grid";
    const titulo = document.querySelector(".alimento");
    titulo.style.textAlign = "center";
};


/*
Ajustes para o futuro:
- Deixar o site responsivo para dispositivos móveis e outros formatos de tela. OK
- Adicionar uma animação de carregamento enquanto a refeição está sendo buscada.
- Implementar tradução para o Português.
- Adicionar animações suaves para a transição entre as duas telas.
- Alinhar o header centralizado a esquerda. OK

*/




