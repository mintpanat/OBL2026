let rawData = [
{
fullName:'ผู้บริหาร A',
division:'ฝ่ายการพยาบาล',
adminPos:'หัวหน้างาน',
onlineCount:4,
overall:'ผ่าน'
}
];

window.onload = ()=>{
renderAll();
initCharts();
document.getElementById('searchInput').addEventListener('keyup',renderTable);
};

function renderAll(){
document.getElementById('totalUsers').innerText = rawData.length;

const pass = rawData.filter(x=>x.overall.includes('ผ่าน')).length;

document.getElementById('passRate').innerText =
Math.round((pass/rawData.length)*100)+'%';

renderTable();
updateCharts();
}

function renderTable(){

const search = document.getElementById('searchInput').value.toLowerCase();

const tbody = document.getElementById('tableBody');

tbody.innerHTML='';

rawData.filter(x=>x.fullName.toLowerCase().includes(search))
.forEach(item=>{

tbody.innerHTML += `
<tr>
<td>${item.fullName}</td>
<td>${item.division}</td>
<td>${item.adminPos}</td>
</tr>
`;

});
}

let chart;

function initCharts(){

chart = new Chart(document.getElementById('topicChart'),{
type:'bar',
data:{
labels:['Online'],
datasets:[{
label:'จำนวน',
data:[0]
}]
}
});

updateCharts();
}

function updateCharts(){

chart.data.datasets[0].data = [
rawData.reduce((a,b)=>a+b.onlineCount,0)
];

chart.update();
}
