const regiterFields = [
    { id: 'name', label: 'Name', type: 'text', placeholder: 'Full name' },
    { id: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' },
    { id: 'password', label: 'Password', type: 'password', placeholder: '********' },
    { id: 'password_confirmation', label: 'Confirm Password', type: 'password', placeholder: 'Re-enter your password' },
];

const loginFields = [
    { id: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' },
    { id: 'password', label: 'Password', type: 'password', placeholder: '********' },
]

export {
    regiterFields,
    loginFields,
}
