(function () {
    var model = {
        id: 'Id',
        fields: {
    <% for (var i = 0; i < fields.length; i++) {
        var f = fields[i];
    %>
        <%= f %>: {
                field: '<%= f %>',
                defaultValue: ''
            },
     <% } %>
        }
    };

    <% if(type == 'everlive' && everliveKey) { %>
        // Initialize Everlive SDK
        app.evelive = new Everlive({
            apiKey: '<%= everliveKey %>',
            scheme: 'http'
        });
    <% } %>

    app.models.<%= view %>.<%= name %> = new kendo.data.DataSource({
        type: '<%= type %>',
        schema: {
            model: model
        },
        transport: {
            <% if (type == 'everlive') { %>
                // Required by Backend Services
                typeName: '<%= collection %>'
            <% } else { %>
                    read: {
                        url: "<%= url %>/<%= collection %>"
                    }
            <% } %>
            },
        change: function (e) {

        },
        sort: { field: 'CreatedAt', dir: 'desc' }
    });
})();