$(function() {
	$.extend(WorkoutLog, {
		definition: {
			userDefinitions: [],


			setDefinitions: function() {
				console.log('Made it to set Defintions!')
				var definition = WorkoutLog.definition.userDefinitions;
				// console.log(history[1].id)
				// console.log(WorkoutLog.definition.userDefinitions)
				
				var definitions = definition.length;
				// let definitions = WorkoutLog.definition.userDefinitions;
				// console.log(definitions)
				var lis = "";
					for (var i = 0; i < definitions; i++) {
					lis += '<div class="card"><div class="card-body">' + 
					definition[i].description + 	
					"</div></div>";					
				}
				$(".card-columns").children().remove();
				$(".card-columns").append(lis);
				
			},

			create: function() {

				var def = { 
		         		desc: $("#def-description").val(),
						// type: $("#def-logtype").val()
				};
				var postData = { definition: def };
		      	var define = $.ajax({
					type: "POST",
					url: WorkoutLog.API_BASE + "definition",
					data: JSON.stringify(postData),
					contentType: "application/json"
		      	});

		      	define.done(function(data) {
					  WorkoutLog.definition.userDefinitions.push(data.definition);
					 
					  console.log(data.definition.description);
					//   let definition = data.definition.description;
					//   localStorage.setItem("definition", definition)
					//   let definitions = localStorage.getItem("definitions")
					//   let card = $(``);
					//   let workoutTitle = $(``)             
					//   card.append(workoutTitle)
					//   $('.card-columns').append(card)
					  $("#def-description").val("");
					//   $("#def-logtype").val("");
		      	});
		  },

		  fetchAll: function() {
				let userId = window.localStorage.getItem("userId")
				console.log('userId is:')
				console.log(userId)
				var fetchDefs = $.ajax({
				type: "GET",
				url: WorkoutLog.API_BASE + "definition/" + userId,
				headers: {
				"authorization": window.localStorage.getItem("sessionToken")
		         }
		      })
		      .done(function(data) {
				  console.log('fetch all suceeded! ata returned is:')
				  console.log(data)
				 WorkoutLog.definition.userDefinitions = data;
				 console.log(data)
				 
		      })
		      .fail(function(err) {
		         console.log(err);
		      });
		  }
		}
	});

	// bindings
		$("#def-save").on("click", WorkoutLog.definition.create);



   // fetch definitions if we already are authenticated and refreshed
    if (window.localStorage.getItem("sessionToken")) {
      WorkoutLog.definition.fetchAll();
   }

   

});