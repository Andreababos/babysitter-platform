import { TestBed, async } from '@angular/core/testing';
import { FilterUsers } from "./user.filter";

/*
Test plan:

Valid data:
1.0: Searching for 'per' should return one result (lowercase searching)
1.1: Searching for 'Per' should return one result (capitalcase searching)
1.2: Searching for 'PER' should return one result (uppercase searching)
1.3: Searching for 'Per Hansen' should return one result (exact name)
1.4: Search for 'copen' should return two results (partial location)
1.5: Search for 'Copenhagen' should return two results (exact location)
1.6: Searching for '' (empty string) should return the original array (no filtering)


Invalid data:
2.0: Test with no dataset (empty array), searching for 'Per'
2.1: Passing undefined as a parameter
*/


describe('User filter', () => {
    beforeEach(() => {
      
      TestBed.configureTestingModule({
        declarations: [
        FilterUsers
        ],
      });
    });

    let users = [
        {_id: '10', firstName: 'Per', lastName: 'Hansen', location: 'Copenhagen', role:'sitter', email:'per@mail.com', password:'password', filter:'andrea'},
        {_id: '11', firstName: 'Jens', lastName: 'Hansen', location: 'Copenhagen', role:'sitter', email:'jens@mail.com', password:'password', filter:'andrea'},
        {_id: '12', firstName: 'Helle', lastName: 'Hansen', location: 'Helsingor', role:'sitter', email:'helle@mail.com', password:'password', filter:'andrea'},
        {_id: '13', firstName: 'Jørgen', lastName: 'Hansen', location: 'Farum', role:'sitter', email:'jorgern@mail.com', password:'password', filter:'andrea'},
        {_id: '14', firstName: 'Berit', lastName: 'Hansen', location: 'Valby', role:'sitter', email:'berit@mail.com', password:'password', filter:'andrea'},     
    ];

    it('1.0: Searching for per should give me one result (lowercase searching)', () => {
        // Arrage, Act, Assert
        let filter = new FilterUsers(); // Arrange
        let result = filter.transform(users, 'per'); // Act
        expect(result.length).toBe(1); //Assert (Expect)
        expect(result[0].firstName).toBe('Per');
      });

      it('1.1: Searching for Per should return one result (capitalcase searching)', () => {
        // Arrage, Act, Assert
        let filter = new FilterUsers(); // Arrange
        let result = filter.transform(users, 'Per'); // Act
        expect(result.length).toBe(1); //Assert (Expect)
        expect(result[0].firstName).toBe('Per');
      });
      
      it('1.2: Searching for PER should return one result (uppercase searching)', () => {
        // Arrage, Act, Assert
        let filter = new FilterUsers(); // Arrange
        let result = filter.transform(users, 'PER'); // Act
        expect(result.length).toBe(1); //Assert (Expect)
        expect(result[0].firstName).toBe('Per');
      });
      
      it('1.3: Searching for Per Hansen should return one result (exact name)', () => {
        // Arrage, Act, Assert
        let filter = new FilterUsers(); // Arrange
        let result = filter.transform(users, 'Per Hansen'); // Act
        expect(result.length).toBe(1); //Assert (Expect)
        expect(result[0].firstName).toBe('Per');
      });

      it('1.4: Search for copen should return two results (partial location)', () => {
        // Arrage, Act, Assert
        let filter = new FilterUsers(); // Arrange
        let result = filter.transform(users, 'copen'); // Act
        expect(result.length).toBe(2); //Assert (Expect)
        expect(result[0].location).toBe('Copenhagen');
      });

      it('1.5: Search for Copenhagen should return two results (exact location)', () => {
        // Arrage, Act, Assert
        let filter = new FilterUsers(); // Arrange
        let result = filter.transform(users, 'Copenhagen'); // Act
        expect(result.length).toBe(2); //Assert (Expect)
        expect(result[0].location).toBe('Copenhagen');
      });

      it('1.6: Searching for empty string should return the original array (no filtering)', () => {
        // Arrage, Act, Assert
        let filter = new FilterUsers(); // Arrange
        let result = filter.transform(users, ''); // Act
        expect(result.length).toBe(5); //Assert (Expect)
      });
    });
   
   
