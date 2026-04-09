namespace App\Helpers;

class SeoHelper
{
    public static function generateTags($product = null)
    {
        if (!$product) {
            return [
                'title' => 'KitchenAll Pro | Industrial Equipment Nairobi',
                'description' => 'Top-tier commercial kitchen hardware in Kenya.'
            ];
        }

        return [
            'title' => "{$product->name} | KitchenAll Pro",
            'description' => \Illuminate\Support\Str::limit(strip_tags($product->description), 155),
            'image' => $product->image_url
        ];
    }
}and  i will be adding
