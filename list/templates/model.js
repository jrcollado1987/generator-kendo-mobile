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

    app.models.<%= view %>.source = new kendo.data.DataSource({
        type: 'everlive',
        schema: {
            model: model
        },
        transport: {
            // Required by Backend Services
            typeName: '<%= collection %>'
        },
        change: function (e) {

        },
        sort: { field: 'CreatedAt', dir: 'desc' }
    });
})();