const API_KEY="45fe035063e745118e48acc3cd486af9";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews("India"));

async function fetchNews(query){
    const res=await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data= await res.json();
    console.log(data);
    bindData(data.articles);
}

function reload(){
    window.location.reload();
}

function bindData(articles){
    const cardContainer=document.getElementById('card-container');
    const cardTemplate=document.getElementById('news-template');
    cardContainer.innerHTML='';


    articles.forEach(article => {
        if(!article.urlToImage) return;

        const cardClone=cardTemplate.content.cloneNode(true);
        fillData(cardClone,article);
        cardContainer.appendChild(cardClone);
    });

};

function fillData(cardClone,article){
    cardImg=cardClone.querySelector('#news-img');
    cardTitle=cardClone.querySelector('#news-title');
    cardSource=cardClone.querySelector('#news-source');
    cardDesc=cardClone.querySelector('#news-desc');

    cardImg.src=article.urlToImage;
    cardTitle.innerHTML=article.title;
    cardDesc.innerHTML=article.description;

    const date= new Date(article.publishedAt).toLocaleString('en-US',{timeZone:"Asia/Jakarta"})

    cardSource.innerHTML=`${article.source.name} : ${date}`
    cardClone.firstElementChild.addEventListener('click', ()=> {
        window.open(article.url,"_blank");
    })
}
let selectedNav=null;
function onNavclick(id){
    fetchNews(id);
    const navItem=document.getElementById(id);
    selectedNav?.classList.remove('active');
    selectedNav=navItem;
    selectedNav.classList.add('active');

}

const searchBtn=document.getElementById('search-button');
const searchText=document.getElementById('search-text');

searchBtn.addEventListener("click" ,() =>{
    const query=searchText.value;
    if(!query) return;
    fetchNews(query);
    selectedNav.classList.remove('active');
})