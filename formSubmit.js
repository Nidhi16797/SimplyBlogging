/*
Author: Nidhi Lunagariya
Project: Simply Blogging
*/


var row_count = 0 
var col_count = 0
current_cells = []
blogs = []

function getBlogData(){
    var blog_title = document.getElementById("title").value
    var blog_desc = document.getElementById("desc").value

    console.log(blog_title)
    console.log(blog_desc)

    
    storeData(blog_title,blog_desc)
    postBlog(blog_title,blog_desc)
    clearBlogForm()
}

function postBlog(title,desc){
    
    function create_row(){
        var table = document.getElementById('blogPostTable')
        var tbody = document.getElementsByTagName('tbody')[0]
        var new_row = tbody.insertRow(-1)
        var cell1 = new_row.insertCell(0)
        var cell2 = new_row.insertCell(1)
        return [cell1,cell2]
    }
    console.log("Made it to postBlog!")
    if( (row_count == 0 && col_count == 0) || col_count == 2){
        current_cells = create_row()
        col_count = 0
    }
    var curr_cell = current_cells[col_count]

    var inner_html = get_inner_HTML(title,desc)
    curr_cell.innerHTML = inner_html
    col_count++
}

function retreiveData(){
   
    var blog_data = JSON.parse(localStorage.getItem("blogs"))
    
    for(var i = 0; i < blog_data.length; i++){
       
        var title = blog_data[i].title
        var desc = blog_data[i].desc
        postBlog(title,desc)
    }
}

function get_inner_HTML(title,desc){
 
        return `
            <div class='smallBlog'>
                <h4>${title}</h4>
                <div class="smallBlogDesc">
                    <p>${desc}</p>
                </div>
               
            </div>`
    }


function clearBlogForm(){
    document.getElementById("title").value = ""
    document.getElementById("desc").value = ""
   
}

// Storage Functions
function storeData(title,desc){
    function checkStorageExists(){
        return localStorage.getItem('blogs') != null
    }

    var storage_exists = checkStorageExists()

    if(storage_exists){
        
        var list_of_blogs = JSON.parse(localStorage.getItem('blogs'))
        blog_data = {}
        blog_data.title = title
        blog_data.desc = desc
        list_of_blogs.push(blog_data)
        localStorage.setItem("blogs",JSON.stringify(list_of_blogs))   
    }
    else{
        blog_data = {}
        blog_data.title = title
        blog_data.desc = desc
        blogs.push(blog_data)
        json_blog_data = JSON.stringify(blogs)
        localStorage.setItem("blogs",json_blog_data)
    }
}

function clearLocalStorage(){
    localStorage.clear()
}


var table_mode = true
var grid_mode = false
function gridPostBlog(title,desc){
    console.log("Made it to postBlog!")
    if(row_count == 0 && col_count == 0){
        console.log("nothing yet..")
        create_grid_row()
        col_count = 0
    }
    else if(col_count == 2){
        row_count++
        create_grid_row()
        col_count = 0
    }
    
    var curr_col = create_grid_col()
    
    var inner_html = get_inner_HTML(title,desc)
    curr_col.innerHTML = inner_html
    col_count++
}

function create_grid_row(){
    var gridStart = document.getElementById("blogPostsGrid")
    var new_row = document.createElement('div')
    new_row.id = row_count
    new_row.className = 'row'
    gridStart.appendChild(new_row)
}

function create_grid_col(){
    var gridStart = document.getElementById("blogPostsGrid")
    console.log(gridStart)
    console.log("curr_row num = " + row_count)
    var curr_row = document.getElementById(row_count.toString())
    console.log(curr_row)
    var new_col = document.createElement('div')
    new_col.className = 'col'
    curr_row.appendChild(new_col)
    console.log("created col...")
    return new_col
}

function grid_retrieve_data(){
    
    var blog_data = JSON.parse(localStorage.getItem("blogs"))
    

    for(var i = 0, count = 1; i < blog_data.length; i++,count++){
        
        var title = blog_data[i].title
        var desc = blog_data[i].desc
        gridPostBlog(title,desc)
    }
}  

function show_data(){

    var mode = localStorage.getItem("mode")
    if(mode == 'table'){
        retreiveData
    }
    else if(model == 'grid'){
        var grid_loc = document.getElementById("gridBlogLocation")
        var grid = document.createElement('div')
        grid.id = 'blogPostsGrid'
        grid_retrieve_data();
    }
}

function table_mode_enable(){
    grid_mode = false
    table_mode = true
    localStorage.setItem('mode','table')
    return table_mode
}
function grid_mode_enable(){
    table_mode = false
    grid_model = true
    localStorage.setItem('mode','grid')
    return grid_mode
}