1. Create a NodeJS Server that has 2 endpoints. GetMany should return the entire list of fake products. 
GetSingle should accept an ID, and return just that 1 product. 

// part 1 is done

// npm start from root to run server, listens on http://localhost:8080/

// product page can be reached via http://localhost:8080 or http://localhost:8080/product.html

// example usage of GetMany - http://localhost:8080/GetMany

// example usage of GetSingle (pass id, which looks up _id within json) - http://localhost:8080/GetSingle?id=5c58693b2f3b8ac746a18f85

2. Create an SPA which wires up the static HTML given in the repo (You can use (or not) any framework you are comfortable with).

// done


3. "Wire up" includes any search, sort, or filters you see on the page.

// done

// sorting highest to lowest or lowest to highest by price done

// sorting by price range done

// sorting by search text is done

// support for multiple filters at once is done

// color filter done

// price slider? 

// paginate first page of products? looks like we'd need a "3" at the bottom and I could update how many we are displaying.


4. The SPA should have 2 pages, a list all products, and an individual product page. Both HTML templates are provided.

// done as 2 pages are provided to edit.

// product detail loads GetSingle using the id of the given item. done.

5. Delivery should be a separate github repo on your own account. 

// done
