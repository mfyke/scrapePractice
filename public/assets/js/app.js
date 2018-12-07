$(document).ready(()=>{

	$(".newsHeadline").click((event)=>{
		$(".modal-content").empty();
		const id = event.target.id;
		let form = $("<form>").addClass("text-center").attr("action", `/notes/article/${id}`).attr("method", "POST").html(`<input type="text" name="noteBody" required><button class="btn btn-success" type="submit">Add new note!</button>`);
		$(".modal-content").append(form);
		$.get(`/notes/article/${id}`, (data)=>{
			data.forEach((element)=>{
				// console.log(element);
				let noteText = $("<p>").text(element.body);
				let deleteButton = $("<button>").addClass("btn btn-danger deleteButton").attr("id", element._id).text("delete");
				$(".modal-content").prepend(deleteButton).prepend(noteText);
			});
		});
	});

	$(".deleteButton").click(()=>{
		console.log("yoyoo");
	})


});
