// src/pages/ChannelPage.jsx

/* eslint-disable no-unused-vars */
import React from 'react';
import ChannelList from '../Components/ChannelList';
import AddChannelForm from '../Components/AddChannelForm';

const ChannelsPage = () => {
    return (
        <div id='ChannelsPage'>
           
            <AddChannelForm />


            <h1>Channel List</h1>
            <ChannelList />
        </div>
    );
};

export default ChannelsPage