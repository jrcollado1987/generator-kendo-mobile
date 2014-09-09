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