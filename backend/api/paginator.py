from rest_framework.pagination import PageNumberPagination

class BlogPaginator(PageNumberPagination):
    page_size = 3
    page_query_param = "q"