<%
Dim user, location, skills
user = Request.QueryString("User")
location = Request.Form("Location")
skills = Request.Form("Skills")
Response.Write("Name: " & user & "<br />")
Response.Write("Location: " & location & "<br />")
Response.Write("Skills: " & skills & "<br>")
%>
