export const Navbar = () => {
    return `
      <nav class="fixed top-0 w-full z-50 glass-panel border-b border-white/10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <div class="flex items-center">
              <a href="/" class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent to-purple-500">
                Priya Computers
              </a>
            </div>
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <a href="/" class="hover:text-accent px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</a>
                <a href="/shop.html" class="hover:text-accent px-3 py-2 rounded-md text-sm font-medium transition-colors">Shop</a>
                <a href="/customize.html" class="hover:text-accent px-3 py-2 rounded-md text-sm font-medium transition-colors">Customize</a>
                <a href="/cart.html" class="hover:text-accent px-3 py-2 rounded-md text-sm font-medium transition-colors">Cart <span id="cart-count"></span></a>
                <a href="/dashboard.html" class="bg-accent/10 hover:bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-medium transition-colors">Account</a>
              </div>
            </div>
            <div class="md:hidden">
                <button class="text-white">Menu</button>
            </div>
          </div>
        </div>
      </nav>
    `;
}
