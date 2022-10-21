# Fresh Tomatoes
A webpage for searching movie information

## Project Descriptions
1. We created a hompage where all the popular movies are fetched from API and dispalyed.
2. The home page has options to search movies based on keywords,genres and a combination of both.
3. All the movies display a movie poster, name, rating(average rating from all users in your database), the loged in users rating, movie deatils.
4. When users click on movie details, an overview of the movie is dispalyed and users can rate the movies only if the user is logged in. It also has the feature of displaying the ratings, if the user has already rated the movie from our database.
### Possible Future Features
5. If a user does not have an account,he/she can signup and create a new account.
6. In the sign up page, users will have to fill all input field, password and confirm-password should be same. Passwords are savd as a hash not as text in the database.When user logs in,the password user inputs will be matched with the hashed password.
7. We have created 2 tables in the database. One for storing the users details and second for storing the movie ratings.
8. The rating table saves the ratings along with the logged in User’s user Id and movieId(Fetched from the API)

## User Story
AS A movie watcher
I WANT to find information on my favorite movies 
SO THAT I can have deeper insight on what they are about

## Frameworks implemented
- Bulma
- jQuery

## Server Side APIs
- OMDb API
- Wikipedia API

## Built With
- HTML
- CSS
- Javascript

## Task Breakdown
- Create homepage html 
- Create results page html 
- Create CSS for homepage and results page
- Create JavaScript


## Collaborators
- [Connor McGrath](https://github.com/CJMerit)
- [Hadleigh McLeod](https://github.com/hadscloud)
- [John Pinto](https://github.com/jpinto2)
- [Iqbal Ahmadi](https://github.com/IqbalAhmadi)
