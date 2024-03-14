

Task Description:
Implement CRUD Operations with Redux and Persistence

Objective:
Build a simple React application that demonstrates CRUD operations using Redux for state management. Additionally, implement data persistence to ensure that the application retains its state even when the page is refreshed.

First route :- "/" >> ( Show all User data in Table )
	Table cell Titles:>>
  						a._id
              b.Name 
  						c.phone Number
              d.discription
              e.date
              f.Profile Image
              g.selected_id
  						h.actions> edit , delete :: This modal will prompt users to confirm their intention before proceeding with the action.
              
      
              
              
Second route :- "/add">> (add user data using Formik validation)
     *all fied is required
		a> _id :: auto genarate on create new user data
    b> name :: allow text fields only space , alphabates and numbers
    c> Phone :: validate only phone number
		d> Discription :: allowed characters include alphabets, numbers, and the special characters &, @, <, >, and _.
    f> Profile Image :: allow only jpeg png file & max size(1048576).
    g> selected_id :: use select dropdown for show previous added user data "_id".

Third rout :- "/edit" >> only use one Component for add and edit page
