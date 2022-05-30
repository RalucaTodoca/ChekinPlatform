package com.example.checkin.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class UserData implements CommandLineRunner {

    private final UserRepository userRepository;

    @Autowired
    public UserData(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) throws Exception {

        User u1 = new User("George", "Parker", null, null, null, UserRole.GUEST);
        User u2 = new User("John", "Adams", 2, "Computer Science", "English", UserRole.STUDENT);
        User u3 = new User("Thomas", "Jefferson", null, "Computer Science", "English", UserRole.TEACHER);
        User u4 = new User("James", "Madison", null, null, null, UserRole.ADMIN);

        if(userRepository.findUserByLastName(u1.getLastName()).isEmpty()){
            userRepository.save(u1);
        }

        if(userRepository.findUserByLastName(u2.getLastName()).isEmpty()){
            userRepository.save(u2);
        }

        if(userRepository.findUserByLastName(u3.getLastName()).isEmpty()){
            userRepository.save(u3);
        }

        if(userRepository.findUserByLastName(u4.getLastName()).isEmpty()){
            userRepository.save(u4);
        }

    }
}
