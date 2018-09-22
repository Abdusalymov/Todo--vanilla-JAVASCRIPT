window.onload = function () {
	if (localStorage.getItem('todo')) {
		let body = document.querySelector('body');
		let str = JSON.parse(localStorage.getItem('todo'));
		body.innerHTML = str;
	}

	(function () {
		const btnAdd = document.getElementById('main_task');
		const wrapper = document.querySelector('.wrapper_inner');
	
		btnAdd.addEventListener('click', function () {
			let ul = document.createElement('ul');
			ul.setAttribute('class', 'block_list')
			ul.innerHTML = `<li class="hedear_blockList">
											<div>
												<button class="btn_in_Block btn cursor_style" data-id="remove_block">REMOVE BLOCK</button>
												<button class="btn_in_Block btn cursor_style" data-id="add_item">ADD ITEM</button>
											</div>
											<span class="open_close cursor_style" data-id="openClose">CLOSE</span>
										</li>
										<h1 class="name_task cursor_style"><input type="text" class="name" data-id="name"></h1>
										<div class="hide"></div>`;
			wrapper.appendChild(ul);
			update();
		});

		wrapper.addEventListener('click', (e) => {
			if (e.target.dataset.id == "remove_block") e.target.parentElement.parentNode.parentNode.remove();
			if (e.target.dataset.id == "add_item") {
				const li = document.createElement('li');
				li.setAttribute('class', 'child');


				li.innerHTML = `<label>
												<input type="checkbox" class='checkbox'>
												<span class="checkbox_custom"></span>
												<input type="text" data-id="item">
											</label>
											<div>
												<span class='add'>Add</span>
												<span class='remove'>Remove</span>
											</div>`;
				e.target.parentElement.parentNode.nextElementSibling.nextElementSibling.appendChild(li);
				console.log(e.target.parentElement.parentNode.nextElementSibling.nextElementSibling);
			}
			if (e.target.className == "add") {
				const sub_ul = document.createElement('ul');
				sub_ul.setAttribute('class', 'drop_list')
				sub_ul.innerHTML = `<li class='child'>
														<label>
															<input type="checkbox" class='checkbox'>
															<span class="checkbox_custom"></span>
															<input type="text" data-id="item">
														</label>
														<span class='remove'>Remove</span>
													</li>`;
				e.target.parentNode.parentNode.appendChild(sub_ul);
			}
			if (e.target.className == "remove") {
				e.target.parentNode.parentNode.remove();
			}
			if (e.target.dataset.id == "openClose") {
				if (e.target.innerText == "CLOSE") {
					e.target.parentElement.nextElementSibling.nextElementSibling.style.display = 'none';
					e.target.innerHTML = "OPEN";
				} else {
					e.target.parentElement.nextElementSibling.nextElementSibling.style.display = 'block';
					e.target.innerHTML = "CLOSE";
				}
			}
		})

		wrapper.addEventListener('change', function (e) {
			if (e.target.dataset.id == "item") {
				const text = document.createTextNode(e.target.value);
				e.target.parentElement.replaceChild(text, e.target);
			}
			if (e.target.dataset.id == "name") {
				e.target.parentElement.innerHTML = e.target.value;
			};
			if (e.target.className == "checkbox") {
				e.target.setAttribute("checked", "checked")
			};
			update();
		});
	})();

	function update() {
		let allTodo = document.querySelector('.wrapper_todo').outerHTML;
		localStorage.setItem('todo', JSON.stringify(allTodo));
	}
}