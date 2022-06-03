import express from "express";

export default function sessionHandler({ services = {} }) {
    const {
        twitterService,
        sessionServices,
    } = services;
    return {
        async userRegister(req, res) {},
        async userLogin(req, res) {},
        async userDetails(req, res) {},
    };
}