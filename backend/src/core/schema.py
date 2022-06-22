import graphene

from product.schema import ProductQuery

class Query(
    ProductQuery,
    graphene.ObjectType
):
    pass


class Mutation(graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query)
#schema = graphene.Schema(query=Query, mutation=Mutation)
