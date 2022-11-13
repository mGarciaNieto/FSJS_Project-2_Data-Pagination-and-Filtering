/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/* @author Manuel Garcia-Nieto */

'use strict'

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

/* DOM References
--------------------------------------------------------- */
const studentList = document.querySelector('.student-list')
const linkList = document.querySelector('.link-list')
const searchSection = document.querySelector('.header')

/* Variables
---------------------------------------------------------- */
const students = data
const itemsPerPage = 9
const firstPage = 1

/**
 * Create the `showPage` function
 * This function will create and insert/append the elements needed to display a "page" of nine students
 *
 * @param  {array} list - Array of student objects
 * @param  {int} page - Page number
 */
function showPage(list, page) {
  const startIndex = page * itemsPerPage - itemsPerPage
  const endIndex = page * itemsPerPage
  let studentItem = ''

  studentList.innerHTML = ''

  list.forEach((item, i) => {
    if (i >= startIndex && i < endIndex) {
      studentItem += ` <li class="student-item cf">
      <div class="student-details">
        <img class="avatar" src=${list[i].picture.large} alt="Profile Picture">
        <h3>${list[i].name.first} ${list[i].name.last}</h3>
        <span class="email">${list[i].email}</span>
      </div>
      <div class="joined-details">
        <span class="date">Joined ${list[i].registered.date}</span>
      </div>
    </li>
  `
    }
  })

  studentList.insertAdjacentHTML('beforeend', studentItem)
}

/**
 * Create the `addPagination` function
 * This function will create and insert/append the elements needed for the pagination buttons
 *
 * @param  {array} list - Array of student objects
 */
function addPagination(list) {
  const numOfPages = Math.ceil(list.length / itemsPerPage)
  linkList.innerHTML = ''
  let button = ''

  for (let i = 1; i <= numOfPages; i++) {
    button += `<li>
                  <button type="button">${i}</button>
               </li>
               `
  }
  linkList.insertAdjacentHTML('beforeend', button)

  const buttons = document.querySelectorAll("button[type='button']")
  buttons[0].className = 'active'

  linkList.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      document.getElementsByClassName('active')[0].className = ''
      e.target.className = 'active'
      showPage(list, e.target.textContent)
    }
  })
}

/**
 * Create the `addSearch` function
 * This function will display the students found according to input
 */
function addSearch() {
  let searchForm = `<label for="search" class="student-search">
  <span>Search by name</span>
  <input id="search" placeholder="Search by name...">
  <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
  </label>
  `
  searchSection.insertAdjacentHTML('beforeend', searchForm)

  const searchBar = document.getElementById('search')

  searchBar.addEventListener('keyup', (e) => {
    let matchStudents = []

    for (const student of students) {
      const studentFullName = `${student.name.first} ${student.name.last}`.toUpperCase()
      if (studentFullName.includes(searchBar.value.toUpperCase())) {
        matchStudents.push(student)
      }
    }

    showPage(matchStudents, firstPage)
    addPagination(matchStudents)

    if (matchStudents.length === 0) {
      studentList.insertAdjacentHTML('beforeend', `<h1 class="h1">No results found</h1>`)
    }
  })
}

// Call functions
showPage(students, firstPage)
addPagination(students)
addSearch()
