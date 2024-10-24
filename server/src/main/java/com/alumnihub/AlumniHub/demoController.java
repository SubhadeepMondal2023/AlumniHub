package com.alumnihub.AlumniHub;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class demoController {

    @GetMapping("/path")
    public String display()
    {
        return ("hello world");
    }
}
