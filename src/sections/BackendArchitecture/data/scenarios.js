// ── Request scenarios ─────────────────────────────────────────────────────────
// Each step has: nodeId, title, description, codeSnippet, status, httpStatus?
// status: "processing" | "success" | "error"

export const SCENARIOS = [
  {
    id: "success",
    label: "Successful Request",
    badge: "200 OK",
    method: "GET",
    endpoint: "/api/products/",
    description: "A valid authenticated request that returns product data.",
    steps: [
      {
        nodeId: "client",
        title: "User Action",
        description:
          "The user clicks a button in the React app. React constructs an HTTP GET request with the JWT access token in the Authorization header.",
        codeSnippet: `// React component
fetch("/api/products/", {
  headers: {
    "Authorization": "Bearer eyJhbGciOi..."
  }
})`,
        status: "processing",
      },
      {
        nodeId: "api",
        title: "URL Routing",
        description:
          "The request reaches Django REST Framework. The URL router matches /api/products/ and dispatches it to ProductViewSet.list().",
        codeSnippet: `# urls.py
router = DefaultRouter()
router.register(r"products", ProductViewSet)

urlpatterns = [
    path("api/", include(router.urls)),
]`,
        status: "processing",
      },
      {
        nodeId: "auth",
        title: "JWT Validated",
        description:
          "The JWTAuthentication class decodes the access token, verifies the signature, and identifies the user. Authentication answers: who is making this request?",
        codeSnippet: `# settings.py
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ],
}

# Token is decoded → user = User.objects.get(id=payload["user_id"])`,
        status: "processing",
      },
      {
        nodeId: "perms",
        title: "Permission Check",
        description:
          "DRF runs permission classes. IsAuthenticated confirms the user is valid. Permissions answer: is this user allowed to perform this action?",
        codeSnippet: `# views.py
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    permission_classes = [IsAuthenticated]

# IsAuthenticated.has_permission() → True`,
        status: "processing",
      },
      {
        nodeId: "service",
        title: "Business Logic",
        description:
          "The viewset calls the service layer, which applies business rules — filtering, pagination, validation — before touching the database.",
        codeSnippet: `# services.py
class ProductService:
    @staticmethod
    def list_products(user, filters=None):
        queryset = Product.objects.all()
        if filters:
            queryset = queryset.filter(**filters)
        return queryset`,
        status: "processing",
      },
      {
        nodeId: "database",
        title: "PostgreSQL Query",
        description:
          "The ORM translates the queryset into SQL and executes it against PostgreSQL. The database returns the matching rows.",
        codeSnippet: `# Django ORM → SQL
Product.objects.all().filter(is_active=True)

-- Executed SQL
SELECT id, name, price, is_active
FROM products
WHERE is_active = true;`,
        status: "processing",
      },
      {
        nodeId: "response",
        title: "Serialize & Return",
        description:
          "DRF serializes the queryset into JSON using the ProductSerializer, then returns an HTTP 200 response with the data.",
        codeSnippet: `# serializers.py
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ["id", "name", "price"]

# Response
Response(serializer.data, status=200)

# HTTP 200 OK
# Content-Type: application/json
[
  {"id": 1, "name": "Widget", "price": "29.99"},
  {"id": 2, "name": "Gadget", "price": "49.99"}
]`,
        status: "success",
        httpStatus: "200 OK",
      },
      {
        nodeId: "client",
        title: "Response Received",
        description:
          "React receives the 200 response, parses the JSON, and updates the UI to display the product list to the user.",
        codeSnippet: `// React — response handling
const res = await fetch("/api/products/", { ... });
const products = await res.json();
// → [{ id: 1, name: "Widget", price: "29.99" }, ...]
setProducts(products); // UI updates`,
        status: "success",
      },
    ],
  },

  {
    id: "unauthorized",
    label: "Unauthorized Request",
    badge: "401 Unauthorized",
    method: "GET",
    endpoint: "/api/orders/",
    description: "An expired or invalid JWT token is rejected at authentication.",
    steps: [
      {
        nodeId: "client",
        title: "User Action",
        description:
          "The user requests their order history. React sends GET /api/orders/ with an expired JWT token in the header.",
        codeSnippet: `// React — expired token in header
fetch("/api/orders/", {
  headers: {
    "Authorization": "Bearer eyJhbGciOi..." // ← expired
  }
})`,
        status: "processing",
      },
      {
        nodeId: "api",
        title: "URL Routing",
        description:
          "The request reaches DRF. The router matches /api/orders/ and dispatches to OrderViewSet.list().",
        codeSnippet: `# urls.py
router.register(r"orders", OrderViewSet)

# Dispatched → OrderViewSet.list()`,
        status: "processing",
      },
      {
        nodeId: "auth",
        title: "Authentication Failed",
        description:
          "JWTAuthentication tries to decode the token, but it has expired. The request is rejected with 401 Unauthorized. It does NOT continue to permissions, business logic, or the database.",
        codeSnippet: `# JWTAuthentication.authenticate()
try:
    payload = jwt_decode(token)  # ← raises
    user = User.objects.get(id=payload["user_id"])
except ExpiredTokenError:
    raise AuthenticationFailed(
        "Token is expired", code="token_not_valid"
    )

# → HTTP 401 Unauthorized
# {"detail": "Token is expired",
#  "code": "token_not_valid"}`,
        status: "error",
        httpStatus: "401 Unauthorized",
      },
      {
        nodeId: "client",
        title: "Error Received",
        description:
          "React receives the 401 response. The app can redirect to login or refresh the token. No orders data is returned.",
        codeSnippet: `// React — 401 handling
const res = await fetch("/api/orders/", { ... });
// res.status === 401
// → redirect to /login
// or → call /api/token/refresh/`,
        status: "error",
      },
    ],
  },

  {
    id: "forbidden",
    label: "Forbidden Request",
    badge: "403 Forbidden",
    method: "DELETE",
    endpoint: "/api/products/15/",
    description: "An authenticated user without admin rights tries to delete a product.",
    steps: [
      {
        nodeId: "client",
        title: "User Action",
        description:
          "A regular user tries to delete a product. React sends DELETE /api/products/15/ with a valid JWT token.",
        codeSnippet: `// React — delete request
fetch("/api/products/15/", {
  method: "DELETE",
  headers: {
    "Authorization": "Bearer eyJhbGciOi..." // valid
  }
})`,
        status: "processing",
      },
      {
        nodeId: "api",
        title: "URL Routing",
        description:
          "DRF matches /api/products/15/ and dispatches to ProductViewSet.destroy() with pk=15.",
        codeSnippet: `# Dispatched →
# ProductViewSet.destroy(request, pk=15)`,
        status: "processing",
      },
      {
        nodeId: "auth",
        title: "JWT Validated",
        description:
          "The token is valid. The user is identified as customer@example.com — a regular user, not an admin.",
        codeSnippet: `# JWTAuthentication
# Token is valid → user = customer@example.com
# user.is_staff = False
# user.is_superuser = False`,
        status: "processing",
      },
      {
        nodeId: "perms",
        title: "Permission Denied",
        description:
          "IsAdminOrReadOnly checks if the user is staff. The user is a regular customer, so the DELETE is rejected with 403 Forbidden. The request does NOT reach business logic or the database.",
        codeSnippet: `# views.py
class ProductViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminOrReadOnly]

# IsAdminOrReadOnly.has_permission()
if request.method in SAFE_METHODS:
    return True   # GET, HEAD, OPTIONS → allowed
return request.user.is_staff  # DELETE → False

# → HTTP 403 Forbidden
# {"detail": "You do not have
#  permission to perform this action."}`,
        status: "error",
        httpStatus: "403 Forbidden",
      },
      {
        nodeId: "client",
        title: "Error Received",
        description:
          "React receives the 403 response and shows an error message: the user is not authorized to delete products.",
        codeSnippet: `// React — 403 handling
const res = await fetch("/api/products/15/", { ... });
// res.status === 403
// → show: "You don't have permission
//   to perform this action."`,
        status: "error",
      },
    ],
  },
];
