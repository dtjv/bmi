document.addEventListener('DOMContentLoaded', function() {
  M.Sidenav.init(document.querySelectorAll('.sidenav'), {});

  M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'), {
    hover: true,
    autoFocus: false,
    coverTrigger: false,
    constrainWidth: false
  });
});
