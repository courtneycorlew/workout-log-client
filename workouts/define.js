$(function() {
	$.extend(WorkoutLog, {
		definition: {
			userDefinitions: [],

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
					  console.log(data.definition);
					  let definition = data.definition
					  let card = $(`<div class="card text-white mb-3"> </div>`);
					  let workoutTitle = $(`<div class="card-body">${definition}</a></div>`)             
					  card.append(workoutTitle)
					  $('.card-columns').append(card)
					  $("#def-description").val("");
					  $("#def-logtype").val("");
					  console.log(data.definition);
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