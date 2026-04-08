<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KitchenAll Admin</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        :root {
            --sidebar-bg: #0B1F3A; /* Midnight Blue */
            --accent: #1E90FF;     /* Blue */
            --light-bg: #F5F6FA;
        }
        body { background-color: var(--light-bg); font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        .sidebar {
            min-height: 100vh;
            background-color: var(--sidebar-bg);
            color: white;
            padding-top: 20px;
        }
        .sidebar a {
            color: #bdc3c7;
            text-decoration: none;
            padding: 12px 25px;
            display: block;
            transition: 0.3s;
        }
        .sidebar a:hover {
            background-color: var(--accent);
            color: white;
        }
        .active-link {
            background-color: var(--accent);
            color: white !important;
        }
        .content-area { padding: 30px; }
        .top-nav {
            background: white;
            padding: 15px 30px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }
    </style>
</head>
<body>

<div class="container-fluid">
    <div class="row">
        <nav class="col-md-2 d-none d-md-block sidebar shadow">
            <h3 class="text-center fw-bold mb-4">KitchenAll</h3>
            <a href="/admin/dashboard" class="active-link">📊 Dashboard</a>
            <a href="/admin/products">📦 Products</a>
            <a href="/admin/orders">🧾 Orders</a>
            <a href="/admin/customers">👥 Customers</a>
            <a href="/admin/manage-admins">👥 Admins</a>
            <div class="mt-5 p-3">
<form action="{{ route('admin.logout') }}" method="POST" class="px-4 mt-auto pb-8">
    @csrf
    <button type="submit" class="w-full py-2.5 px-4 rounded-lg bg-white text-[#0B1F3A] font-black uppercase tracking-widest text-[11px] border-none hover:bg-red-500 hover:text-white transition-all duration-300 shadow-lg">
        Logout
    </button>
</form>
            </div>
        </nav>

        <main class="col-md-10 p-0">
            <div class="top-nav d-flex justify-content-between align-items-center">
                <h5 class="m-0 text-muted">Admin Panel v1.0</h5>
                <div class="user-profile">
                    <strong>Admin User</strong>
                </div>
            </div>
            
            <div class="content-area">
                @yield('content')
            </div>
        </main>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>