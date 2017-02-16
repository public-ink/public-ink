from shared import RequestHandler, cross_origin
import json #hm

class GraphQLEndpoint(RequestHandler):
    def get(self):
        """
        Renders the GraphiQL IDE, populated with a query if it exists
        """
        query = self.request.GET.get('query')
        # this does shit all, but might be useful later
        # res = urllib.unquote(query).decode()

        template = ninja.get_template('graphiql.html')
        template_values = {
            'query': query
        }
        # hack for un-quoting double quotes like these "
        output = template.render(template_values).replace('&#34;', '"')
        self.response.write(output)

    @cross_origin
    def post(self):
        """
        Accepts a query, executes it, and returns the result
        """
        data = json.loads(self.request.body)
        query = data.get('query', '')
        variables = data.get('variables')
        result = schema.execute(query, variable_values=variables)
        response = {'data' : result.data}
        self.response.headers['Content-Type'] = 'application/json; charset=utf-8'
        self.response.out.write(json.dumps(response))