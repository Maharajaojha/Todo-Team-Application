import './Style/sidebar.css'

export const Sidebar = () => {
    return (
        <aside className="sidebar">

            {/* Logo */}
            <div className="sidebar-logo">
                <span className="logo-icon">✓</span>
                <span>TaskFlow</span>
            </div>


            {/* Main Navigation */}
            <nav className="sidebar-nav">

                <p className="menu-title">
                    MENU
                </p>

                <a href="#" className="nav-item active">
                    <span>🏠</span>
                    <span>Dashboard</span>
                </a>

                <a href="#" className="nav-item">
                    <span>📋</span>
                    <span>All Tasks</span>
                </a>

                <a href="#" className="nav-item">
                    <span>⭐</span>
                    <span>Important</span>
                </a>

                <a href="#" className="nav-item">
                    <span>📅</span>
                    <span>Today</span>
                </a>

                <a href="#" className="nav-item">
                    <span>📆</span>
                    <span>Upcoming</span>
                </a>

            </nav>


            {/* Categories */}
            <div className="sidebar-categories">

                <p className="menu-title">
                    CATEGORIES
                </p>

                <a href="#" className="nav-item">
                    <span>💼</span>
                    <span>Work</span>
                </a>

                <a href="#" className="nav-item">
                    <span>📚</span>
                    <span>Study</span>
                </a>

                <a href="#" className="nav-item">
                    <span>👤</span>
                    <span>Personal</span>
                </a>

                <a href="#" className="nav-item">
                    <span>🛒</span>
                    <span>Shopping</span>
                </a>

            </div>


            {/* Bottom Navigation */}
            <div className="sidebar-bottom">

                <a href="#" className="nav-item">
                    <span>⚙️</span>
                    <span>Settings</span>
                </a>

                <a href="#" className="nav-item logout">
                    <span>🚪</span>
                    <span>Logout</span>
                </a>

            </div>

        </aside>
    );
};
