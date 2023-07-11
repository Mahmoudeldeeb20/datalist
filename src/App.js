import React from "react";
import "./App.css";
import { useRef, useState } from "react";

function App() {
	const newItemList = useRef();
	const [listData, setListData] = useState([
		{ id: 1, title: "Item 1", checked: false },
		{ id: 2, title: "Item 2", checked: false },
		{ id: 3, title: "Item 3", checked: false },
	]);
	const updateListItemStatus = (i) => {
		const listItems = [...listData];
		listItems[i].checked = !listItems[i].checked;
		setListData(listItems);
	};
	const deleteListItem = (id) => {
		setListData(listData.filter((item) => item.id !== id));
	};
	const addListItem = () => {
		if (newItemList.current.value.trim() !== "") {
			let newId = Math.floor(Math.random() * 1000);
			while (listData.some((item) => item.id === newId)) {
				newId = Math.floor(Math.random() * 1000);
			}
			const listItems = [...listData, { id: newId, title: newItemList.current.value, checked: false }];
			setListData(listItems);
			newItemList.current.value = "";
		}
	};
	const handleChange = (event) => {
		this.setState({ value: event.target.value });
	};

	return (
		<div className="App">
			<div className="container">
				<div className="w-50 mx-auto my-5 list-items">
					{listData.map((item, i) => (
						<div className="item" key={item.id}>
							<div className={`form-check to-do-item${item.checked ? " checked" : ""}`} onClick={() => updateListItemStatus(i)}>
								<input className="form-check-input" type="checkbox" checked={item.checked} id={item.id} onChange={() => handleChange()} />
								<label className="form-check-label" htmlFor={item.id}>
									{item.title}
								</label>
							</div>
							<button className="btn btn-danger delete-item" onClick={() => deleteListItem(item.id)}>
								Delete
							</button>
						</div>
					))}
					<div className="list-add">
						<div className="input-group">
							<input ref={newItemList} type="text" className="form-control" placeholder="Add to do" />
							<button
								className="btn btn-primary"
								type="button"
								onClick={() => {
									addListItem();
								}}
							>
								Add
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;

