var alert_messages = {
  "pl": {
    "data_unavailable": "Dane, które próbujesz obejrzeć nie są już dla Ciebie dostępne. Przykro mi! Skontaktuj się ze mną, jeżeli wciąż chcesz je oglądać.",
    "no_data": "Wygląda na to, że nie otrzymałem kontaktu dotyczącego rekrutacji od Twojej firmy, stąd też nie masz pozwolenia na przejrzenie informacji."
  },
  "en": {
    "data_unavailable": "The data are no longer available to you. Sorry! Please, contact me if you wish to view.",
    "no_data": "It seems you or your company did not contact me regarding recruitation, therefore you have no permition to view."
  }
}

var get_data = function(folder_name, lang, data_file, handler){
  $.get(
    "resources/" + folder_name + "/" + lang + "/" + data_file
  ).done(handler).fail(function(){get_data("default", lang, data_file, handler)});
};


var get_template_and_render_data = function(template_file, placeholder, data){
  $.get("templates/" + template_file).done(function(template){
    var rendered = Mustache.render(template, data);
    $(placeholder).html(rendered);
  }).fail(function(jqXHR, textStatus, errorThrown){
    console.log("error!");
    console.log(jqXHR);
    console.log(textStatus);
    console.log(errorThrown);
  });
}

var top_data = function(data){
  $("#name_placeholder").html(data.my_name);
  $("#email_placeholder").html(data.email);
  $("#phone_placeholder").html(data.contact_phone);
  $("#github_placeholder").html(
    "<a href='" + data.github + "'>" + data.github + "</a>"
  );
}

var it_tools = function(data){
  get_template_and_render_data("it_tools.html", "#it_tools_placeholder", data);
}

var add_to_list = function(data, placeholder){
  get_template_and_render_data("simple_list_card.html", placeholder, {"title": data.title, "data": data.data});
}

var it_skills = function(data){
  add_to_list(data, "#it_skills_placeholder");
}

var interests = function(data){
  add_to_list(data, "#interests_placeholder");
}

var languages = function(data){
  get_template_and_render_data("languages.html", "#languages_placeholder", data);
}

var other_exp = function(data){
  add_to_list(data, "#other_exp_placeholder");
}

var texts = function(data){
  $("#summary_placeholder").html(data.summary);
  $("#consent_placeholder").html(data.consent);
}

var job_experience = function(data){
  get_template_and_render_data("job_experience.html", "#job_experience_placeholder", data);
}

var education = function(data){
  get_template_and_render_data("education.html", "#education_placeholder", data);
}

var trainings = function(data){
  get_template_and_render_data("trainings.html", "#trainings_placeholder", data);
}

$(document).ready(function() {
  $("#load_stuff").click(function(){
    var folder_name = $("#name").val();
    var folder = "resources/" + folder_name + "/";
    var language = $("#language").val();
    var success = false;
    $.get(folder.concat("test.json"), function(data){
      if(data.success){
        //var success = true;
        document.documentElement.lang = language;
        folder = folder.concat(language, "/");
        $("#form").hide();
        $("#cv").show();
        $.get("resources/top.json", top_data);
        $.get(folder + "it_tools.json", it_tools);
        $.get(folder + "it_skills.json", it_skills);
        $.get(folder + "interests.json", interests);
        $.get(folder + "languages.json", languages);
        $.get(folder + "other_experience.json", other_exp);
        $.get(folder + "texts.json", texts);
        $.get(folder + "work_experience.json", job_experience);
        //$.get(folder + "education.json", education);
        get_data(folder_name, language, "education.json", education);
        $.get(folder + "trainings.json", trainings);
      } else {
        alert(alert_messages[language]["data_unavailable"])
      }

    });
    //if(!success){
    //  alert(alert_messages[language]["no_data"]);
    //};
  });
});
