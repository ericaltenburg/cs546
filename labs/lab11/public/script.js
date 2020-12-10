$(document).ready(() => {
    var initialConfig = {
        method: 'GET',
        // headers: {
        //     'Content-Type': 'application/x-www-form-urlencoded'
        // },
        url: 'http://api.tvmaze.com/shows',
        dataType: 'json'
    };

    $.ajax(initialConfig).then( (response_data) => {
        $('#showList').empty();
        $('#homeLink').hide();
        $('#show').hide();

        response_data.map((show_data) => {
            let li = `<li><a class="link" href='${show_data._links.self.href}'>${show_data.name}</a></li>`;
            $('#showList').append(li);
        });
        $('#showList').show();

        $('a.link').click( (event) => {
            event.preventDefault();
            clicky_linky(event.target.href);
        })
    });

    $('#searchForm').submit( (event) => {
        event.preventDefault();

        let term = $('#search_term').val().trim();

        if (term) {
            $('#errorDiv').empty();
            $('#errorDiv').hide();
            $('#show').empty();
            $('#showList').empty();

            var searchConfig = {
                method: 'GET',
                // headers: {
                //     'Content-Type': 'application/x-www-form-urlencoded'
                // },
                url: `http://api.tvmaze.com/search/shows?q=${term}`,
                dataType: 'json'
            };

            $.ajax(searchConfig).then( (response_data) => {
                response_data.map( (show) => {
                    let li = `<li><a class="link" href='${show.show._links.self.href}'>${show.show.name}</a></li>`;
                    $('#showList').append(li);
                });

                $('a.link').click( (event) => {
                    event.preventDefault();
                    clicky_linky(event.target.href);
                });
            });
            $('#show').hide();
            $('#search_term').val("");
            $('#showList').show();
            $('#homeLink').show();
        } else {
            $('#errorDiv').empty();
            $('#errorDiv').append('<p>Please enter a valid search term.</p>');
            $('#errorDiv').show();
        }
    })

    function clicky_linky(linky) {

        $('#errorDiv').empty();
        $('#errorDiv').hide();
        $('showList').hide();
        $('show').empty();
        

        var clickedConfig = {
            method: 'GET',
            // headers: {
            //     'Content-Type': 'application/x-www-form-urlencoded'
            // },
            url: linky,
            dataType: 'json'
        };

        $.ajax(clickedConfig).then( (response_data) => {
            let name = (response_data.name) ? response_data.name : 'N/A';
            let img_src = (response_data.image && response_data.image.medium) ? response_data.image.medium : '/public/no_image.jpeg';
            let lang = (response_data.language) ? response_data.language : 'N/A';
            let rating = (response_data.rating && response_data.rating.average) ? response_data.rating.average : 'N/A';
            let net = (response_data.network) ? response_data.network.name : 'N/A';
            let summ = (response_data.summary) ? response_data.summary : 'N/A';
            let genre_arr = (response_data.genres.length !== 0) ? response_data.genres : 'N/A';
            if (typeof genre_arr !== 'string') {
                genre_arr = genre_arr.map( (value) => `<li>${value}</li>`).join('');
            } else 
                genre_arr = '<li>N/A</li>';

            let show_content = `
            <h1>${name}</h1>
            <img alt="${name}" src="${img_src}">
            <dl>
                <dt>Language</dt>
                <dd>${lang}</dd>
                <dt>Genres</dt>
                <dd>
                    <ul>
                        ${genre_arr}
                    </ul>
                </dd>
                <dt>Average Rating</dt>
                <dd>${rating}</dd>
                <dt>Network</dt>
                <dd>${net}</dd>
                <dt>Summary</dt>
                <dd>${summ}</dd>
            </dl>
            `;

            $('#show').append(show_content);
            $('#show').show();
            $('#showList').hide();
            $('#homeLink').show();
        });
    }
});