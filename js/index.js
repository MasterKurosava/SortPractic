// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
      fruits__list=document.querySelector('.fruits__list'),
      shuffleButton = document.querySelector('.shuffle__btn'), // кнопка перемешивания
      filterButton = document.querySelector('.filter__btn'), // кнопка фильтрации
      sortKindLabel = document.querySelector('.sort__kind'), // поле с названием сортировки
      sortTimeLabel = document.querySelector('.sort__time'), // поле с временем сортировки
      sortChangeButton = document.querySelector('.sort__change__btn'), // кнопка смены сортировки
      sortActionButton = document.querySelector('.sort__action__btn'), // кнопка сортировки
      kindInput = document.querySelector('.kind__input'), // поле с названием вида
      colorInput = document.querySelector('.color__input'), // поле с названием цвета
      weightInput = document.querySelector('.weight__input'), // поле с весом
      addActionButton = document.querySelector('.add__action__btn'), // кнопка добавления
      classList={'фиолетовый': 'fruit_violet', "зеленый": 'fruit_green',  "розово-красный": 'fruit_carmazin', "жeлтый": 'fruit_yellow', "светло-коричневый": 'fruit_lightbrown'},
      colorArr=['фиолетовый','зеленый','розово-красный','жeлтый','светло-коричневый'];
// список фруктов в JSON формате
let fruitsJSON = `[
  {"index": 1,"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"index": 2,"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"index": 3,"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"index": 4,"kind": "Карамбола", "color": "жeлтый", "weight": 28},
  {"index": 5,"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);
const originalArr=fruits;

/*** ОТОБРАЖЕНИЕ ***/
const display = () => {
  const fruitNode=document.querySelectorAll('.fruit__item');
  fruitNode.forEach(e=> e.remove());

  for (let i = 0; i < fruits.length; i++) {
    const cart= document.createElement('li');
    cart.classList.add('fruit__item',`${classList[fruits[i].color]}`)
    cart.innerHTML=`
                  <div class="fruit__info">
                    <div>index: ${fruits[i].index}</div>
                    <div>kind: ${fruits[i].kind}</div>
                    <div>color:${fruits[i].color}</div>
                    <div>weight (кг): ${fruits[i].weight}</div>
                  </div>`

    fruits__list.appendChild(cart)
    
  }
};
display();

/*** ПЕРЕМЕШИВАНИЕ ***/
const shuffleFruits = () => {
  let before=[];before=fruits;

  fruits= fruits.map(i=>[Math.random(), i]).sort().map(i=>i[1])
  if(JSON.stringify(before)===JSON.stringify(fruits)){
    alert('Ничего не поменялось, попробуйте еще раз')
  }
};
/*** Обработка перемешивания ***/
shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/
const filterFruits = () => {
  fruits=originalArr;
  let min=document.querySelector('.minweight__input').value;
  let max=document.querySelector('.maxweight__input').value;
  if(min,max!=''){
    min=parseInt(min); max= parseInt(max);
    if(typeof(min)=='number' && typeof(max)=='number'){
      fruits=fruits.filter(el=>el.weight>=min && el.weight<=max)
    }
  }else{alert('Введите цифры!')}
};
/*** Обработка фильтрации ***/
filterButton.addEventListener('click', () => {
  filterFruits();
  display();
});

let sortKind ='Сортировка пузыриком'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки
// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;
/*** Меняем тип сортировки ***/
sortChangeButton.addEventListener('click', () => {
  sortKind==='Сортировка пузыриком'?sortKind='Быстрая сортировка':sortKind='Сортировка пузыриком';
  sortKindLabel.textContent=sortKind;
});
/*** МЕНЯЕМ ВРЕМЯ СОРТИРОВКИ ***/
const sortTimeFunction=(start)=>{
  sortTimeLabel.textContent=(performance.now()-start).toFixed(4);
}

/*** СОРТИРОВКА ***/
//проверка цвета
const comparation = (a, b) => {
  color1=colorArr.indexOf(a.color);
  color2=colorArr.indexOf(b.color);
  return color1>color2;
};
//сортировка пузырем
const bubbleSort=(arr, comparation) => {
  let startTime=performance.now()
  for(let i=0;i<arr.length-1;i++){
    for(let j=0;j<arr.length-1-i;j++){
      if(comparation(arr[j],arr[j+1])){
        const temp=arr[j];
        arr[j]=arr[j+1];
        arr[j+1]=temp;
      }
    }
  }
  fruits=arr;
  display(),sortTimeFunction(startTime)
}
//сортировка быстрая
const FastSort=(comparation) => {
  let startTime=performance.now()
  fruits=fruits.sort((a, b) => colorArr.indexOf(a.color) - colorArr.indexOf(b.color));
  display(),sortTimeFunction(startTime)
}
sortActionButton.addEventListener('click',()=>{
  sortTimeLabel.textContent='сортировка...'
  sortKind=='Быстрая сортировка'?FastSort(comparation):bubbleSort(fruits,comparation)})
//ДОБАВЛЕНИЕ ФРУКТА
let newIndex=6;
let addNewObj=()=>{
  let newKind=kindInput.value,
  newColor=colorInput.value,
  newWeight=weightInput.value;
  //меняем Ё и заглавные буквы
  newColor=newColor.replace('ё','e').toLowerCase();
  console.log(fruits.indexOf('жeлтый')); 
  
  //проверка 
  if(newKind.length<1 && newKind.length>=20){
    alert('Введите значние от 2 до 20 символов');
  }else if(colorArr.indexOf(newColor)==-1){
    alert(`Введите другие цвета. Доступные: ${colorArr}`);
  }else if(newWeight=='' && newWeight<=0){
    alert('Введите положительное число');
  }else{ 
    //создаем новый блок
    let newObj={"index":newIndex,"kind":newKind,"color":newColor,"weight":parseInt(newWeight)};
    originalArr.push(newObj);
    console.log(newObj,fruits);
    newIndex++;
    filterFruits();
    display();
  }
 
}
//обработчик создания нового блока
addActionButton.addEventListener('click', () => {
  addNewObj();
});