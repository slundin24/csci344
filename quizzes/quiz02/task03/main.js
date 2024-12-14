// your code here:
document.addEventListener('DomContentLoaded', function() {
    document.getElementById('search-button').addEventListener('click', async function(ev) {
    ev.preventDefault();

    const searchTerm = document.getElementById('term').value;
    const location = document.getElementById('location').value;
    const openNow = document.getElementById('open_now').checked;

    const businesses = await getBusinesses(searchTerm, location, 10, openNow);
    showData(businesses);

});

async function getBusinesses(search_term, location, num_results, open_now){
    const endpoint = 'https://www.apitutor.org/yelp/simple/v3/businesses/search';
    let url = `${endpoint}?term=${search_term}&location=${location}&limit=${num_results}`;

    if(open_now){
        url += '&open_now=true';
    }
    const response = await fetch(url);
    const data = await response.json();
    return data.businesses;
}

function businessToHTML(business){
    const { name, location, image_url, rating, price, review_count } = business;
    return `
    <section class="business">
        <h2>${name}</h2>
        <p>Address: ${location}</p>
        <img src="${image_url}" alt=${name}">
        <p>Rating: ${raing}</p>
        <p>Price: ${price || ''}</p>
        <p># of Reviews: ${review_count}</p>
    </section>
    `;
}

function showData(businesses){
    const resultsDiv = document.querySelector('resultss');
    resultsDiv.innerHTML = '';

    if(businesses.length === 0){
        resultsDiv.innerHTML = '<p>No results found</p>';
        return;
    }

    businesses.forEach(business => {
        const businessHTML = businessToHTML(business);
        resultsDiv.innerHTML += businessHTML;
    });
}

});








        