import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
  });

  it('should return all users', () => {
    const users = userService.getUsers();
    expect(users.length).toBe(5);
  });

  it('should return a user by ID', () => {
    const user = userService.getUserById(2);
    expect(user?.name).toBe('Simon');
    expect(user?.city).toBe('Rotterdam');
    expect(user?.email).toBe('simon@mail.com');
  });

  it('should delete a user', () => {
    const initialUserCount = userService.getUsers().length;
    userService.deleteUser(1);
    const updatedUserCount = userService.getUsers().length;
    expect(updatedUserCount).toBe(initialUserCount - 1);
  });

  it('should add a user', () => {
    const newUser = {
      id: 5,
      name: 'New User',
      city: 'New City',
      email: 'newuser@mail.com',
      birthday: new Date('01/01/2000')
    };

    userService.addUser(newUser);
    const users = userService.getUsers();
    expect(users.length).toBe(6);
    expect(users[users.length - 1]).toEqual(newUser);
  });

  it('should update a user', () => {
    const updatedUser = {
      id: 0,
      name: 'Updated Name',
      city: 'Updated City',
      email: 'updated@mail.com',
      birthday: new Date('01/01/2000')
    };

    userService.updateUser(updatedUser);
    const user = userService.getUserById(0);
    expect(user?.name).toBe('Updated Name');
    expect(user?.city).toBe('Updated City');
    expect(user?.email).toBe('updated@mail.com');
  });
});