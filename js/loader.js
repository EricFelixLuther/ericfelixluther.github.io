var get_and_render = function(template_file, placeholder, data){
  $.get("templates/" + template_file, function(template){
    var rendered = Mustache.render(template, data);
    $(placeholder).html(rendered);
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
  get_and_render("it_tools.html", "#it_tools_placeholder", data);
}

var add_to_list = function(data, placeholder){
  get_and_render("simple_list_card.html", placeholder, {"title": data.title, "data": data.data});
}

var it_skills = function(data){
  add_to_list(data, "#it_skills_placeholder");
}

var interests = function(data){
  add_to_list(data, "#interests_placeholder");
}

var languages = function(data){
  get_and_render("languages.html", "#languages_placeholder", data);
}

var other_exp = function(data){
  add_to_list(data, "#other_exp_placeholder");
}

var texts = function(data){
  $("#summary_placeholder").html(data.summary);
  $("#consent_placeholder").html(data.consent);
}

var job_experience = function(data){
  get_and_render("job_experience.html", "#job_experience_placeholder", data);
}

var education = function(data){
  get_and_render("education.html", "#education_placeholder", data);
}

var trainings = function(data){
  get_and_render("trainings.html", "#trainings_placeholder", data);
}

$(document).ready(function() {
  $.get("resources/top.json", top_data);
  $.get("resources/pl/it_tools.json", it_tools);
  $.get("resources/pl/it_skills.json", it_skills);
  $.get("resources/pl/interests.json", interests);
  $.get("resources/pl/languages.json", languages);
  $.get("resources/pl/other_experience.json", other_exp);
  $.get("resources/pl/texts.json", texts);
  $.get("resources/pl/work_experience.json", job_experience);
  $.get("resources/pl/education.json", education);
  $.get("resources/pl/trainings.json", trainings);
});
