var site = document.querySelector('.site');
let table = document.createElement('table');
site.append(table);
var ulTag = document.createElement('ul');
site.append(ulTag);


function getData(pageNum){
	let tData = '';
	tData +=`<tr><th>Name</th><th>Profile Picture</th></tr>`;
let userData = fetch("https://60ca0dad772a7600172052ea.mockapi.io/website",{method:"GET"})
.then((data)=> data.json())
.then((ele)=>{
	for(var i=0+(5*(pageNum-1));i<=(pageNum*5)-1;i++){
		tData +=`<tr><td>${ele[i].name}</td><td><img src="${ele[i].avatar}"></td></tr>`;
	}
	table.innerHTML=tData;
})
}



let page = 1;
let active='';
let totalPage = 10;
function pagination(page,totalPage){
	getData(page);
	let beforePage=page-1;
	let afterPage=page+1;
	let liTag='';
	if(page > 1){
		liTag +=`<li class="prev" onclick="pagination(${page-1},${totalPage})" value="prev">Prev</li>`;
	}

	if(page > 2){
		liTag +=`<li onclick="pagination(1,${totalPage})" value="1">1</li>`;
		if(page > 3){
			liTag +=`<li class="dot">...</li>`;
		}
	}

	for(var plength = beforePage; plength <= afterPage+1 ; plength++){
		
		if(plength === 0){
			plength = 1;
		}
		if(plength > totalPage){
			break;
		}
		if(plength === page){
			active = "active";
		}
		else{
			active = '';
		}
		liTag +=`<li class="li-tag ${active}" onclick="pagination(${plength},${totalPage})" value="prev">${plength}</li>`;
	}


	if(page < totalPage - 2){
		if(page < totalPage - 3 ){
			liTag += `<li class="dot">...</li>`;
		}	
		liTag +=`<li onclick="pagination(${totalPage},totalPage)">${totalPage}</li>`;
	}
	if(page < totalPage){
		liTag +=`<li class="next" onclick="pagination(${page+1},${totalPage})" value="next">Next</li>`;
	}
	ulTag.innerHTML = liTag;
}
pagination(page,totalPage);
