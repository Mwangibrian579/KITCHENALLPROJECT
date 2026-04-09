namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Support\Facades\Response;

class SeoController extends Controller
{
    public function sitemap()
    {
        $products = Product::select('slug', 'updated_at', 'name')->get();
        
        // This generates the XML in memory without needing a separate Blade file
        $xml = '<?xml version="1.0" encoding="UTF-8"?>';
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
        
        foreach ($products as $product) {
            $xml .= '<url>';
            $xml .= '<loc>' . config('app.url') . '/product/' . $product->slug . '</loc>';
            $xml .= '<lastmod>' . $product->updated_at->toAtomString() . '</lastmod>';
            $xml .= '<changefreq>weekly</changefreq>';
            $xml .= '</url>';
        }

        $xml .= '</urlset>';

        return Response::make($xml, 200, ['Content-Type' => 'text/xml']);
    }
}