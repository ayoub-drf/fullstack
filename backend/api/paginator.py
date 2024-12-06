from rest_framework.pagination import PageNumberPagination

class BlogPaginator(PageNumberPagination):
    page_size = 10
    page_query_param = "q"