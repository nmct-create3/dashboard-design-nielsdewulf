let daySelect, graph, labels = [], data = [];

const getVisitorsByDay = async day => {
	let datajson = await get(`https://createdagen.azurewebsites.net/api/days/${day}`);

	labels = [];
	data = [];
	let count = 1;
	for(let row of datajson){
		try {
			data.push(row.AantalBezoekers);
			labels.push(`Week ${count}`);
			count++;

		} catch (error) {
			
		}
	}


	var ctx = graph.getContext('2d');


	var gradientFill = ctx.createLinearGradient(0, 0, 0, 500);
	gradientFill.addColorStop(0, "rgba(85, 216, 254, .6)");
	gradientFill.addColorStop(.5, "rgba(85, 216, 254, 0)");

    chart = new Chart(ctx, {
        type: 'line',
        options: {
			legend: {
				display: true,
				position: 'bottom'
			},
            scales: {
                xAxes: [{
                    
                    display: true,
                    // scaleLabel: {
                    //     display: true,
                    //     labelString: 'Week'
                    // },

                }],
                yAxes: [{
                    display: true,
                    ticks: {
                        suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
                        suggestedMax: 50,
                    }
                }]
            },
            tooltips: {
                intersect: false,
                mode: 'index'
            }
        },

        data: {
            labels: labels,
            datasets: [{
                label: 'Aantal bezoekers',
				data: data,
				lineTension: .3,
                // backgroundColor: 'rgba(0,85,255,0.5)',
                borderWidth: 2,
                pointRadius: 5,
                borderColor: '#55D8FE',
                backgroundColor: gradientFill,
                // borderColor: [
                //     'rgba(255, 0, 0, 1)'
                // ],
                pointBackgroundColor: 'white'
            }]
        },

    });
};

const init = () => {
	document.querySelector('.c-hamburger__input').addEventListener('input', e => {
		if (e.target.checked) document.querySelector('.c-app__sidebar').classList.remove('c-app__sidebar--ishidden');
		else document.querySelector('.c-app__sidebar').classList.add('c-app__sidebar--ishidden');
	});

	
	
	document.querySelector('.js-notifications').addEventListener('click', e => {
		let dropdown = document.querySelector('.js-notifications__dropdown');
		let dropdown_other = document.querySelector('.js-user__dropdown');
		dropdown_other.classList.add('c-dropdown--hidden');


		if(dropdown.classList.contains('c-dropdown--hidden'))
			dropdown.classList.remove('c-dropdown--hidden');
		else
			dropdown.classList.add('c-dropdown--hidden');
		
		
	});
	document.querySelector('.js-user').addEventListener('click', e => {
		let dropdown = document.querySelector('.js-user__dropdown')
		let dropdown_other = document.querySelector('.js-notifications__dropdown');
		dropdown_other.classList.add('c-dropdown--hidden');

		if(dropdown.classList.contains('c-dropdown--hidden'))
			dropdown.classList.remove('c-dropdown--hidden');
		else
			dropdown.classList.add('c-dropdown--hidden');
	});
	daySelect = document.querySelector('.js-select');
	graph = document.querySelector('.js-graph');

	daySelect.addEventListener('input', (e) => {
		getVisitorsByDay(e.target.value);
	});
	getVisitorsByDay('maandag');

	var percentageComplete = 0.75;
	var strokeDashOffsetValue = 263.4674987792969 - (percentageComplete * 263.4674987792969);
	var progressBar = document.querySelector(".js-progress-bar");
	progressBar.style.strokeDashoffset = strokeDashOffsetValue;
	console.log(progressBar.style.strokeDashoffset );

};

document.addEventListener('DOMContentLoaded', () => {
	init();
});

const get = async url => {
	let f = await fetch(url, {
		headers: {
			Accept: 'application/json'
		}
	});
	return f.json();
};
