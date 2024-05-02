const LoginSubmit = async (values) => {
    console.log(values);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/authenticate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    }).then((res) => {
        if (res.status === 200) {
            enqueueSnackbar('Logged in successfully', { variant: 'success' });
            res.json()
                .then((data) => {
                    console.log(data);
                    setLoggedIn(true);
                    setCurrentUser(data);
                    sessionStorage.setItem('user', JSON.stringify(data));
                    // store data in cookie
                    document.cookie = `token=${data.token}`;
                    if(data.role === 'admin'){
                        router.push('/admin/manageproduct');
                    }else if(data.role === 'user'){
                        router.push('/browse');
                    }
                })
        } else {
            enqueueSnackbar('Some Error occured', { variant: 'error' });
        }
    }).catch((err) => {
        console.log(err);
    });

}