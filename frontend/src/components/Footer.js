export const Footer = () => {
    return `
      <footer class="bg-primary/80 backdrop-blur-md border-t border-white/5 mt-20">
        <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 class="text-xl font-bold text-white mb-4">Priya Computers</h3>
              <p class="text-gray-400">Premium mobile accessories and personalized skins in Moradabad.</p>
            </div>
            <div>
              <h4 class="text-lg font-semibold text-white mb-4">Quick Links</h4>
              <ul class="space-y-2">
                <li><a href="/shop.html" class="text-gray-400 hover:text-accent transition-colors">Shop</a></li>
                <li><a href="/customize.html" class="text-gray-400 hover:text-accent transition-colors">Customize Skin</a></li>
                <li><a href="/track-order.html" class="text-gray-400 hover:text-accent transition-colors">Track Order</a></li>
              </ul>
            </div>
            <div>
              <h4 class="text-lg font-semibold text-white mb-4">Contact</h4>
              <p class="text-gray-400">Moradabad, India</p>
              <p class="text-gray-400">support@priyacomputers.in</p>
            </div>
          </div>
          <div class="mt-8 pt-8 border-t border-white/5 text-center text-gray-500">
            &copy; ${new Date().getFullYear()} Priya Computers. All rights reserved.
          </div>
        </div>
      </footer>
    `;
}
